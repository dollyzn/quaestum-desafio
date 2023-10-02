import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken'; // Importa o pacote jsonwebtoken

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.signedCookies.token;
    const user = this.decodeToken(token);

    return this.matchRoles(roles, user.profile);
  }

  private matchRoles(allowedRoles: string[], userRoles: string): boolean {
    return allowedRoles.some((role) => role === userRoles);
  }

  private decodeToken(token: string): any {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  }
}
