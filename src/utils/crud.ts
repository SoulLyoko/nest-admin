import { Repository, FindManyOptions, FindConditions, Like } from 'typeorm';
import { PageDto } from '../common/dto/page.dto';

/**
 * 分页查询
 * @param repository 数据库实例
 * @param where 查询条件，包括分页
 * @param options 查询选项
 */
export const findPage = async <T>(
  repository: Repository<T>,
  where: FindConditions<T> & PageDto,
  options: FindManyOptions<T> = {}
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

/**
 * 封装typeorm的Like方法
 */
export const ormLike = (val: string) => {
  return Like(`%${val || ''}%`);
};
