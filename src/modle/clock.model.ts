import { Table, Column } from 'sequelize-typescript'
import BaseModel from './base'
@Table({
  timestamps: false
})
export default class Plan extends BaseModel<Plan> {
  @Column
  content: string;

  @Column
  imgs: string;

  @Column
  planid: number;
}
