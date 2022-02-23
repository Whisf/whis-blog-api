import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User_db as UserModel } from '@prisma/client';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserModel => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
