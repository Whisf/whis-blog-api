import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateUserBody {
  @IsString()
  @ApiProperty()
  firstName: string;

  @IsString()
  @ApiProperty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  @ApiProperty()
  password: string;
}

export class SignInDto {
  @ApiProperty({ example: 'hoang@gmail.com' })
  email: string;

  @ApiProperty({ example: 'abc123' })
  password: string;
}
