import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { RequestWithUser } from '../middleware/context.middleware';

export const CurrentUser = createParamDecorator(
  (data: keyof RequestWithUser['user'] | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);
