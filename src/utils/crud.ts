import { Repository, FindManyOptions, FindConditions, Like } from 'typeorm';
import { PageDto } from '../common/dto/page.dto';

export const findPage = async <T>(
  repository: Repository<T>, //数据库
  where: FindConditions<T> & PageDto, //查询条件，包括分页
  options: FindManyOptions<T> = {} //查询选项
) => {
  const { pageNumber, pageSize } = where;
  options.skip = +pageNumber - 1;
  options.take = +pageSize;
  delete where.pageNumber;
  delete where.pageSize;
  options.where = where;
  const [list, total] = await repository.findAndCount(options);
  const res = { list, total, pageNumber: +pageNumber, pageSize: +pageSize };
  return res;
};

export const ormLike = (val: string) => {
  return Like(`%${val || ''}%`);
};
