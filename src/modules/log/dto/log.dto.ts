import { OmitType, PickType, PartialType, IntersectionType } from '@nestjs/swagger';
import { Log } from '../entities/log.entity';
import { PageDto } from 'src/common/dto/page.dto';

export class CreateLogDto extends OmitType(Log, ['id']) {}

export class UpdateLogDto extends OmitType(CreateLogDto, []) {}

export class FindLogDto extends PartialType(PickType(Log, ['status', 'method'])) {}

export class PageLogDto extends IntersectionType(PageDto, FindLogDto) {}
