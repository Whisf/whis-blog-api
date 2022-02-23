import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './Auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.stage.${process.env.NODE_ENV}`],
    }),
    ArticleModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
