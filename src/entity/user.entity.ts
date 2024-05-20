import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'user',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  username: string;

  password: string;

  nickName: string;

  email: string;

  avatar: string;

  phone: string;

  isFronze: boolean;

  isAdmin: boolean;

  createTime: number;

  updateTime: number;
}
