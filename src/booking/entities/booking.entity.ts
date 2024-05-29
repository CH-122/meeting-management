import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userid: number;

  @Column({ name: 'room_id' })
  roomId: number;

  @Column({ name: 'start_time' })
  startTime: number;

  @Column({ name: 'end_time' })
  endTime: number;

  @Column()
  status: number;

  @Column({ length: 200 })
  note: string;

  @Column({ name: 'create_time' })
  createTime: number;

  @Column({ name: 'update_time' })
  updateTime: number;
}
