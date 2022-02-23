import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { CreateUserBody } from 'src/models/user.model';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/create')
  @ApiOperation({ summary: 'Create User' })
  @ApiBody({
    type: CreateUserBody,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create account successful',
  })
  async CreateUser(@Body() payload: Prisma.User_dbCreateInput) {
    return this.userService.createUser(payload);
  }

  @Get('allUser')
  @ApiOperation({ summary: 'Get all User ' })
  async getAllUser() {
    return this.userService.getAllUser();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get User by Id' })
  @ApiParam({
    type: String,
    name: 'id',
  })
  async getById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiBody({
    type: UpdateUserDto,
  })
  async updateUser(
    @Param('id') id: string,
    @Body() data: Prisma.User_dbUpdateInput,
  ) {
    return this.userService.updateUser(data, id);
  }

  @Delete(':id')
  @ApiParam({
    type: String,
    name: 'id',
  })
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
