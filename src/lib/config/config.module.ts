import { Module } from '@nestjs/common';
import { ConfigModule as Config } from '@nestjs/config';
import appConfig from './app.config';
import jwtConfig from './jwt.config';
import cloudinaryConfig from './cloudinary.config';

@Module({
  imports: [
    Config.forRoot({
      isGlobal: true,
      load: [appConfig, jwtConfig, cloudinaryConfig],
    }),
  ],
})
export class ConfigModule {}
