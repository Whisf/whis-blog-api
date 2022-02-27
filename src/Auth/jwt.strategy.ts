import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User_db } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService, private userService: UserService) {
    super({
      secretOrKey: 'bestsecretever',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: { uid: string }): Promise<User_db> {
    const user: User_db = await this.userService.findById(payload.uid);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
