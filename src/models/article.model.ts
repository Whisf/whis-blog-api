import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArticleBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  content: string;
}

export class UpdateArticleDto {
  @IsString()
  @ApiProperty()
  title?: string;

  @IsString()
  @ApiProperty()
  content?: string;
}
