import { Model } from 'sequelize-typescript'
import { FindOptions } from 'sequelize'

export default class BaseModel<T= any, T2=any > extends Model<T, T2> {
  public static findByPage<M extends BaseModel> (this: { new (): M } & typeof BaseModel, option: FindOptions, pageNo: number, pageSize: number): Promise<{rows: M[]; count: number}> {
    return this.findAndCountAll<M>({
      limit: pageSize ? Number(pageSize) : pageSize,
      offset: pageNo ? (pageNo - 1) * pageSize : 0,
      ...option
    })
  }
}
