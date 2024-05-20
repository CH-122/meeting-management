import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'role',
})
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  name: string;
}
