import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
@Module({
  imports: [],
  providers: [PrismaService, ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
