import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeptsService } from './depts.service';
import { CreateDeptDto } from './dto/create-dept.dto';
import { UpdateDeptDto } from './dto/update-dept.dto';

@ApiTags('Depts')
@Controller('depts')
export class DeptsController {
  constructor(private readonly deptsService: DeptsService) {}

  @Post()
  create(@Body() createDeptDto: CreateDeptDto) {
    return this.deptsService.create(createDeptDto);
  }

  @Get()
  findAll() {
    return this.deptsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deptsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeptDto: UpdateDeptDto) {
    return this.deptsService.update(+id, updateDeptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deptsService.remove(+id);
  }
}
