import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { HttpLoggerMiddleware } from './lib/middleware/logger.middleware';
import { ApiModule } from './api/api.module';
import { ConfigModule } from './lib/config/config.module';
import { PrismaModule } from './prisma/prisma.module';
import { RepositoriesModule } from './repositories/repositories.module';
import { HttpLoggerMiddleware } from './lib/middleware/logger.middleware';
import { JwtModule } from './lib/jwt/jwt.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    RepositoriesModule,
    ConfigModule,
    PrismaModule,
    ApiModule,
    JwtModule,
    CloudinaryModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
