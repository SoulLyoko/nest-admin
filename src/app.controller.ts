import { Controller } from '@nestjs/common';
import { ApiExtraModels } from '@nestjs/swagger';
import { pageDataDto, ResponseDto } from './common/dto/response.dto';

@Controller()
@ApiExtraModels(ResponseDto, pageDataDto)
export class AppController {}
