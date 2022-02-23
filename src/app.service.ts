import { Injectable } from '@nestjs/common';
import { User_db as User } from '@prisma/client';

@Injectable()
export class AppService {
  helo() {
    return 'Hello';
  }
}
