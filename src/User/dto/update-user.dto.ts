import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UpdateUserDto {
  @ApiProperty()
  firstName?: string;
  @ApiProperty()
  lastName?: string;
  email?: string;
  @ApiProperty()
  password?: string;
  @ApiProperty()
  role?: Role;
}
