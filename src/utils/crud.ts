import {
  Repository,
  FindManyOptions,
  FindOneOptions,
  FindConditions,
  Like as OrmLike
} from 'typeorm';
import { responseSuccess, responseFail } from './response';
import { PageDto } from 'src/common/dto/page.dto';

/**
 * 封装typeorm的Like函数
 */
export const Like = (val: string) => OrmLike(`%${val || ''}%`);

/**
 * 公共的crud类
 */
export class simpleCrud<T> {
  constructor(public repository: Repository<T>) {
    this.repository = repository;
  }

  /**
   * 查询数据
   */
  async _findAll(options?: FindManyOptions<T> | FindConditions<T>) {
    try {
      const res = await this.repository.find(options);
      return responseSuccess(res);
    } catch (err) {
      return responseFail(err.message);
    }
  }

  /**
   * 分页查询数据
   */
  async _findPage(
    where: FindConditions<T> & PageDto,
    options: FindManyOptions<T> = {}
  ) {
    try {
      const { pageNumber, pageSize } = where;
      options.skip = +pageNumber - 1;
      options.take = +pageSize;
      delete where.pageNumber;
      delete where.pageSize;
      options.where = where;
      const [list, total] = await this.repository.findAndCount(options);
      const res = { list, total, pageNumber: +pageNumber, pageSize: +pageSize };
      return responseSuccess(res);
    } catch (err) {
      return responseFail(err.message);
    }
  }

  /**
   * 查询单条数据
   */
  async _findOne(
    optionsOrId: FindOneOptions<T> | number,
    options?: FindOneOptions<T>
  ) {
    try {
      let res = null;
      if (typeof optionsOrId === 'number') {
        const id = optionsOrId;
        res = await this.repository.findOne(id, options);
      } else {
        options = optionsOrId;
        res = await this.repository.findOne(options);
      }
      return responseSuccess<T>(res);
    } catch (err) {
      return responseFail<T>(err.message);
    }
  }

  /**
   * 新增数据
   */
  async _save(dto: any) {
    try {
      const res = await this.repository.save(dto);
      return responseSuccess(res);
    } catch (err) {
      return responseFail(err.message);
    }
  }

  /**
   * 更新数据
   */
  async _update(optionsOrId: FindConditions<T> | number, dto: any) {
    try {
      const res = await this.repository.update(optionsOrId, dto);
      return responseSuccess(res);
    } catch (err) {
      return responseFail(err.message);
    }
  }

  /**
   * 删除数据
   */
  async _delete(options: number | FindConditions<T>) {
    try {
      const res = await this.repository.delete(options);
      return responseSuccess(res);
    } catch (err) {
      return responseFail(err.message);
    }
  }
}
