import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UserPayload } from '../models/UserPayload';
import { UserFromJWT } from '../models/UserFromJWT';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWTFromCookie,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  private static extractJWTFromCookie(req: Request): string | null {
    if (req.cookies && req.signedCookies.token) {
      return req.signedCookies.token;
    }
    return null;
  }

  async validate(payload: UserPayload): Promise<UserFromJWT> {
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      profile: payload.profile,
    };
  }
}
