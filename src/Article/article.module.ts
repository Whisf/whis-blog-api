import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'nestjs-prisma';
import { AuthModule } from 'src/Auth/auth.module';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
@Module({
  imports: [AuthModule, PassportModule],
  providers: [PrismaService, ArticleService],
  controllers: [ArticleController],
  exports: [ArticleService],
})
export class ArticleModule {}
