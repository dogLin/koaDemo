import { Table, Column, Model } from 'sequelize-typescript'

@Table({
  // timestamps: false
})
export default class User extends Model<User> {
  @Column
  name: string;

  @Column
  wxOpenId: string;

  @Column
  phone: number;

  @Column
  pwd: string;

  @Column
  avatarUrl: string;

  @Column
  birth: Date;

  @Column
  email: string;

  @Column
  country: string;

  @Column
  province: string;

  @Column
  city: string;
}
