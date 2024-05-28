import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MeetingRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  name: string;

  @Column()
  capacity: number;

  @Column({
    length: 100,
  })
  location: string;

  @Column({
    length: 100,
  })
  equipment: string;

  @Column({
    length: 200,
  })
  description: string;

  @Column({
    name: 'is_booked',
    default: false,
  })
  isBooked: boolean;

  @Column({
    name: 'create_time',
    length: 20,
  })
  createTime: string;

  @Column({
    name: 'update_time',
    length: 20,
  })
  updateTime: string;
}
