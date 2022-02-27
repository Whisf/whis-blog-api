import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Article_db, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async create(
    payload: Prisma.Article_dbCreateInput,
    userId,
  ): Promise<Article_db> {
    return await this.prisma.article_db.create({
      data: {
        ...payload,
        author: { connect: { userID: userId } },
      },
    });
  }

  async filter(): Promise<Article_db[]> {
    return await this.prisma.article_db.findMany({});
  }

  async findById(id: string): Promise<Article_db> {
    return await this.prisma.article_db.findUnique({
      where: { articleId: id },
    });
  }

  async search(id: string): Promise<Article_db[]> {
    const author = await this.prisma.user_db.findFirst({
      where: { userID: id },
    });

    if (!author) {
      throw new UnauthorizedException('Not found author');
    }

    return this.prisma.article_db.findMany({
      where: { authorId: author.userID },
    });
  }

  async update(
    id: string,
    data: Prisma.Article_dbUpdateInput,
  ): Promise<Article_db> {
    const article = this.findById(id);
    if (!article) {
      throw new NotFoundException();
    }
    return this.prisma.article_db.update({
      where: { articleId: id },
      data: {
        ...data,
      },
    });
  }

  async delete(id: string): Promise<any> {
    const article = this.findById(id);

    if (!article) {
      throw new NotFoundException();
    }
    const isDeleted = await this.prisma.article_db.delete({
      where: { articleId: id },
    });

    if (!isDeleted) {
      throw new ConflictException();
    }

    return 'Deleted article';
  }

  async getAllPagination(step: number): Promise<Article_db[]> {
    return this.prisma.article_db.findMany({
      take: 20,
      skip: step * 10,
    });
  }
}
