import {
  GoneException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import * as brcypt from 'bcrypt';
import { PrismaService } from 'nestjs-prisma';
import { SignInDto } from 'src/models/user.model';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  private static async hashPassword(password: string) {
    const salt = brcypt.genSalt();
    return brcypt.hash(password, salt);
  }

  private static async comparePassword(password: string, hash: string) {
    return brcypt.compare(password, hash);
  }

  async signUp(data: Prisma.User_dbCreateInput): Promise<{ token: string }> {
    const user = await this.prisma.user_db.findUnique({
      where: { email: data.email },
    });

    if (user) {
      throw new Error('This Email already existed');
    }
    const usercreated = await this.userService.createUser(data);

    return { token: this.createToken(usercreated.userID) };
  }

  async signIn(data: SignInDto): Promise<{ token: string }> {
    const user = await this.userService.getByEmail(data.email);

    if (!user) {
      throw new UnauthorizedException('Cannot find this user');
    }

    const isMatchedPassword = await AuthService.comparePassword(
      data.password,
      user.password,
    );

    if (!isMatchedPassword) {
      throw new GoneException('Cannot find this user');
    }

    return { token: this.createToken(user.userID) };
  }

  private createToken(userId: string): string {
    const payload = {
      uid: userId,
    };
    return this.jwtService.sign(payload);
  }
}
