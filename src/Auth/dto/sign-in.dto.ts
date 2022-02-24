import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ example: 'hoang@gmail.com' })
  email: string;

  @ApiProperty({ example: 'abc123' })
  password: string;
}
