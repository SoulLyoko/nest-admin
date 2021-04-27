import { ResponseDto } from '../common/dto/response.dto';

export const responseSuccess = (data: any = null, message = '请求成功'): ResponseDto => {
  return {
    code: 0,
    success: true,
    message,
    timestamp: Date.now(),
    data
  };
};

export const responseFail = (message = '请求失败'): ResponseDto => {
  return {
    code: 1,
    success: false,
    message,
    timestamp: Date.now(),
    data: null
  };
};
