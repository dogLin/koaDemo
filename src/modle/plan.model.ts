import { Table, Column } from 'sequelize-typescript'
import BaseModel from './base'
@Table
export default class Plan extends BaseModel<Plan> {
  @Column
  title: string;

  @Column
  content: string;

  @Column
  total: number;

  @Column
  beginDate: number;

  @Column
  endDate: number;

  @Column
  supervise: number; // 监督金

  @Column
  bonus: number; // 奖金

  @Column
  userId: number;

  @Column
  img: string;

  public static findPlansByUserId (id: number | string, pageNo?: number, pageSize?: number): Promise<{rows: Plan[]; count: number}> {
    return this.findByPage({
      where: {
        userId: id
      }
    }, pageNo, pageSize)
  }
}
