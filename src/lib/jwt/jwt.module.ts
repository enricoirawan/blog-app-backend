import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule as Jwt } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { JwtStrategy } from './jwt-strategy';

@Module({
  imports: [
    PassportModule,
    Jwt.register({
      secret: jwtConfig().secret,
      signOptions: { expiresIn: jwtConfig().expired },
    }),
  ],
  providers: [JwtStrategy],
})
export class JwtModule {}
