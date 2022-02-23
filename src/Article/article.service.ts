import { Injectable } from '@nestjs/common';
import { Article_db, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async create(payload: Prisma.Article_dbCreateInput): Promise<Article_db> {
    return await this.prisma.article_db.create({
      data: {
        ...payload,
      },
    });
  }
}
