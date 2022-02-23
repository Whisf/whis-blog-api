import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  providers: [UserService, PrismaService],
  controllers: [UserController],
})
export class UserModule {}
