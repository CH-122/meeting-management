import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'permission' })
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  code: string;

  description: string;
}
