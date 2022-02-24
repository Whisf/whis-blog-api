import { Injectable } from '@nestjs/common';
import { Article_db, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async create(
    payload: Prisma.Article_dbCreateInput,
    userId,
  ): Promise<Article_db> {
    console.log(userId);
    return await this.prisma.article_db.create({
      data: {
        ...payload,
        author: { connect: { userID: userId } },
      },
    });
  }
}
