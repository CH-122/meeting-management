import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    comment: '用户名',
    unique: true,
  })
  username: string;

  @Column({
    length: 50,
    comment: '密码',
  })
  password: string;

  @Column({
    name: 'nickName',
    length: 50,
    comment: '昵称',
  })
  nickName: string;

  @Column({
    comment: '邮箱',
    length: 50,
  })
  email: string;

  @Column({
    comment: '头像',
    length: 100,
    nullable: true,
  })
  avatar: string;

  @Column({
    comment: '手机号',
    length: 20,
    nullable: true,
  })
  phone: string;

  @Column({
    comment: '是否冻结',
    default: false,
  })
  isFrozen: boolean;
  @Column({
    comment: '是否是管理员',
    default: false,
  })
  isAdmin: boolean;

  @Column()
  createTime: number;

  @Column()
  updateTime: number;
}
