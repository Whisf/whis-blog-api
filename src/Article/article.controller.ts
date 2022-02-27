import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Article_db, Prisma } from '@prisma/client';
import { ArticleService } from './article.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateArticleBody, UpdateArticleDto } from 'src/models/article.model';
import { User } from 'src/User/user.decorator';
@Controller('article')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @ApiOperation({ summary: 'Create Article' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Article is created.' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error occure when create Article',
  })
  @ApiBody({
    type: CreateArticleBody,
  })
  @Post('/create')
  createArticle(
    @Body() payload: Prisma.Article_dbCreateInput,
    @User() user: any,
  ) {
    return this.articleService.create(payload, user.userID);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all articles' })
  async getAllArticle() {
    return this.articleService.filter();
  }

  @Get('page/:step')
  @ApiOperation({ summary: 'Get pagination' })
  @ApiParam({
    type: Number,
    name: 'step',
  })
  async getAllPagination(@Param('step') step: number): Promise<Article_db[]> {
    return this.articleService.getAllPagination(step);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Article' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Article is updated.' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error occure when update Article',
  })
  @ApiParam({
    type: String,
    name: 'id',
  })
  @ApiBody({
    type: UpdateArticleDto,
  })
  async updateArticle(
    @Body() data: Prisma.Article_dbUpdateInput,
    @Param('id') id: string,
  ): Promise<Article_db> {
    return this.articleService.update(id, data);
  }

  @Get('author/:id')
  @ApiOperation({ summary: 'Get all articles by authorId' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get articles successful.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error occure when get Article',
  })
  @ApiParam({
    type: String,
    name: 'id',
  })
  async getAllArticlesByAuthorId(
    @Param('id') id: string,
  ): Promise<Article_db[]> {
    return this.articleService.search(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete article' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Article is deleted.' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error occure when delete Article',
  })
  @ApiParam({
    type: String,
    name: 'id',
  })
  async deleteArticle(@Param('id') id: string) {
    return this.articleService.delete(id);
  }
}
