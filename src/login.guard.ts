import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Permission } from './entity/permission.entity';

interface JwtUserData {
  userid: string;
  username: string;
  roles: string[];
  permissions: Permission[];
}

declare module 'express' {
  interface Request {
    user: JwtUserData;
  }
}

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject()
  private reflector: Reflector;

  @Inject(JwtService)
  private jwtService: JwtService;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const requireLogin = this.reflector.getAllAndOverride('require-login', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireLogin) {
      return true;
    }

    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('用户未登录');
    }

    try {
      console.log(authorization);

      // const token = authorization.split(' ')[1];

      // console.log(token);

      const data = this.jwtService.verify<JwtUserData>(authorization);

      console.log(data);

      // this.userService.getRoleAndPermission(data.userid).then((res) => {
      request.user = {
        ...data,
        // roles: res.roles,
        // permissions: res.permissions,
      };
      // });

      return true;
    } catch (e) {
      console.log(e);

      throw new UnauthorizedException('登录过期，请重新登录');
    }
  }
}
