import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseDto, pageDataDto } from '../dto/response.dto';

/**
 * 返回成功
 */
export const ApiResponseSuccess = <TModel extends Type<any>>(model?: TModel, type?: 'list' | 'page') => {
  const getDataDto = (type: 'list' | 'page') => {
    switch (type) {
      case 'list':
        return { type: 'array', items: { $ref: getSchemaPath(model) } };
      case 'page':
        return {
          $ref: getSchemaPath(pageDataDto),
          properties: {
            list: { type: 'array', items: { $ref: getSchemaPath(model) } }
          }
        };
      default:
        return { $ref: getSchemaPath(model) };
    }
  };

  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [{ $ref: getSchemaPath(ResponseDto) }, model ? { properties: { data: getDataDto(type) } } : {}]
      }
    })
  );
};
