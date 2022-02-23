import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import * as bcrypt from 'bcrypt';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(payload: Prisma.User_dbCreateInput) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(payload.password, salt);

    try {
      return this.prisma.user_db.create({
        data: {
          ...payload,
          password: hashPassword,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(`Email ${payload.email} already used.`);
      } else {
        throw new Error(error);
      }
    }
  }

  async findById(Id: string) {
    return this.prisma.user_db.findUnique({ where: { userID: Id } });
  }

  async getAllUser() {
    return this.prisma.user_db.findMany({});
  }

  async updateUser(data: Prisma.User_dbUpdateInput, id: string) {
    return this.prisma.user_db.update({
      where: { userID: id },
      data: { ...data },
    });
  }

  async deleteUser(id: string) {
    const user = await this.findById(id);
    if (user && user.role === 'ADMIN') {
      return this.prisma.user_db.delete({ where: { userID: id } });
    } else {
      throw new NotFoundException();
    }
  }
}
