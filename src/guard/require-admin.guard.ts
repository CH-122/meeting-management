import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Permission } from 'src/entity/permission.entity';

interface JwtUserData {
  userid: string;
  username: string;
  isAdmin: boolean;
  roles: string[];
  permissions: Permission[];
}

declare module 'express' {
  interface Request {
    user: JwtUserData;
  }
}

@Injectable()
export class RequireAdminGuard implements CanActivate {
  @Inject()
  private reflector: Reflector;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const user = request.user;

    console.log(this.reflector);

    const requireAdmin = this.reflector.getAllAndOverride('require-admin', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireAdmin) {
      return true;
    }

    if (!user.isAdmin) {
      throw new HttpException('暂无权限', HttpStatus.BAD_REQUEST);
    }

    return true;
  }
}
