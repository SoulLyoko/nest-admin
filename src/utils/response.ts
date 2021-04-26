import { ResponseDto } from 'src/common/dto/response.dto';

export const responseSuccess = <T>(
  data: any = null,
  msg = '请求成功'
): ResponseDto<T> => {
  return {
    code: 200,
    msg,
    data
  };
};

export const responseFail = <T>(msg = '请求失败'): ResponseDto<T> => {
  return {
    code: 400,
    msg
  };
};
