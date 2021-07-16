import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLE } from '../constants/role.constant';
import { ROLES_KEY } from '../decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const globalRoles = this.reflector.get<ROLE[]>(ROLES_KEY, context.getClass());
    const handlerRoles = this.reflector.get<ROLE[]>(ROLES_KEY, context.getHandler());

    if (!globalRoles && !handlerRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    if (handlerRoles && handlerRoles.length > 0) {
      if (handlerRoles.some((role) => user.roles?.includes(role))) {
        return true;
      }
    } else {
      if (globalRoles.some((role) => user.roles?.includes(role))) {
        return true;
      }
    }

    throw new UnauthorizedException(
      `User with roles ${user.roles} does not have access to this route with roles ${[...(handlerRoles ? handlerRoles : []), ...(globalRoles ? globalRoles : [])]}`,
    );
  }
}
