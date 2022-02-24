import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { CreateUserBody } from 'src/models/user.model';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('Auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/singUp')
  @ApiOperation({ summary: 'Sign up' })
  @ApiBody({
    type: CreateUserBody,
  })
  async signUp(
    @Body() data: Prisma.User_dbCreateInput,
  ): Promise<{ token: string }> {
    return this.authService.signUp(data);
  }

  @Post('sigin')
  @ApiOperation({ summary: 'Sign in' })
  @ApiBody({
    type: SignInDto,
  })
  async signIn(@Body() data: SignInDto): Promise<{ token: string }> {
    return this.authService.signIn(data);
  }
}
