import { Permission } from '../entities/permission.entity';

export class RoleAndPermissionVO {
  id: string;
  username: string;
  nickName: string;
  email: string;
  phone: string;
  avatar: string;
  createTime: string;
  isFrozen: boolean;
  isAdmin: boolean;
  roles: string[];
  permissions: Permission[];
}
