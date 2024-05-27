import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';

export const RequireLogin = () => SetMetadata('require-login', true);

export const RequirePermission = (...permissions: string[]) =>
  SetMetadata('require-permission', permissions);

export const UserInfo = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.user) {
      return null;
    }

    return key ? request.user[key] : request.user;
  },
);
