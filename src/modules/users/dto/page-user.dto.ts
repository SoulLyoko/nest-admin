import { IntersectionType } from '@nestjs/swagger';
import { FindUserDto } from './find-user.dto';
import { PageDto } from 'src/common/dto/page.dto';

export class PageUserDto extends IntersectionType(PageDto, FindUserDto) {}
