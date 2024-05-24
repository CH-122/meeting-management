import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permission } from './permission.entity';
import { Role } from './role.entity';

@Entity({ name: 'role_permissions' })
export class RolePermission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'role_id',
  })
  roleId: number;

  @Column({
    name: 'permission_id',
  })
  permissionId: number;

  @ManyToOne(() => Role, (role) => role.rolePermissions)
  @JoinColumn({
    name: 'role_id',
  })
  role: Role;

  @ManyToOne(() => Permission, (permission) => permission.rolePermissions)
  @JoinColumn({
    name: 'permission_id',
  })
  permission: Permission;
}
