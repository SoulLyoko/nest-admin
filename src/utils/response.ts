import { ResponseDto } from '../common/dto/response.dto';

/**
 * 响应成功
 * @param data 响应数据
 * @param message 响应信息
 */
export const responseSuccess = (data: any = null, message = '请求成功'): ResponseDto => {
  return {
    code: 0,
    success: true,
    message,
    timestamp: Date.now(),
    data
  };
};

/**
 * 响应失败
 * @param message 错误信息
 */
export const responseFail = (message = '请求失败'): ResponseDto => {
  return {
    code: 1,
    success: false,
    message,
    timestamp: Date.now(),
    data: null
  };
};
