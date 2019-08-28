import { Table, Column, Model } from 'sequelize-typescript'

@Table({
  // timestamps: false
})
export default class User extends Model<User> {
  @Column
  name: string;
}
