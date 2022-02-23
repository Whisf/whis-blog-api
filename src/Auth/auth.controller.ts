import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Prisma, PrismaClient } from '@prisma/client';
import { retryWhen } from 'rxjs';
import { CreateUserBody } from 'src/models/user.model';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('Auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/singUp')
  @ApiOperation({ summary: 'Create User' })
  @ApiBody({
    type: CreateUserBody,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create account successful',
  })
  async signUp(
    @Body() data: Prisma.User_dbCreateInput,
  ): Promise<{ token: string }> {
    return this.authService.signUp(data);
  }
}
