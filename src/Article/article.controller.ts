import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ArticleService } from './article.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateArticleBody } from 'src/models/article.model';
import { User } from 'src/User/user.decorator';
@Controller('article')
// @UseGuards(AuthGuard)
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @ApiOperation({ summary: 'Create Article' })
  @ApiBody({
    type: CreateArticleBody,
  })
  @Post('/create')
  createArticle(
    @Body() payload: Prisma.Article_dbCreateInput,
    @User() user: any,
  ) {
    console.log(payload, user);
    return this.articleService.create(payload);
  }
}
