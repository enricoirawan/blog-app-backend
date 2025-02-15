import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [JwtModule, CloudinaryModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
