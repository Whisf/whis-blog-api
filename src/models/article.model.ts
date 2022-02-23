import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleBody {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;
}
