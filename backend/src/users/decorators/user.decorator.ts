import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtPayload } from "utils/types";

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = <AuthenticatedRequest>ctx.switchToHttp().getRequest();
    return request.user;
  }
);
