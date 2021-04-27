import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/auth.guard';
import { ApiResponseSuccess } from './api-response.decorator';

/**
 * 封装Controller装饰器
 * @param tag 标签
 * @param model 数据模型
 * @param isAuth 是否需要认证，true：所有响应函数都需要认证，false：可单独设置响应函数是否需要认证
 */
export const Class = ({ tag = '', model, isAuth = true }: { tag?: string; model?: any; isAuth?: boolean }) => {
  const args = [ApiTags(tag), SetMetadata('log', tag)];
  model && args.push(ApiExtraModels(model));
  isAuth && args.push(UseGuards(JwtAuthGuard), ApiBearerAuth());
  return applyDecorators(...args);
};

/**
 * 封装响应函数装饰器
 * @param tag 标签
 * @param model 数据模型
 * @param resType 响应数据的类型，默认为对象
 * @param isAuth 是否需要认证
 */
export const Handler = ({
  tag = '',
  model,
  resType,
  isAuth = false
}: {
  tag?: string;
  model?: any;
  resType?: 'list' | 'page';
  isAuth?: boolean;
}) => {
  const args = [ApiOperation({ summary: tag }), ApiResponseSuccess(model, resType), SetMetadata('log', tag)];
  isAuth && args.push(UseGuards(JwtAuthGuard), ApiBearerAuth());
  return applyDecorators(...args);
};
