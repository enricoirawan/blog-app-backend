import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UploadApiErrorResponse } from 'cloudinary';

import { RepositoriesService } from 'src/repositories/repositories.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/lib/config/jwt.config';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly repository: RepositoriesService,
    private readonly jwtService: JwtService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async register(data: RegisterUserDto) {
    const checkEmail = await this.repository.user.findUserByEmail(data.email);
    if (checkEmail) {
      throw new BadRequestException('Email sudah digunakan');
    }

    const checkUser = await this.repository.user.findUserByUsername(
      data.username,
    );
    if (checkUser) {
      throw new BadRequestException('Username sudah digunakan');
    }

    data.password = await bcrypt.hash(data.password, 12);
    const insertUserResult = await this.repository.user.insertUser(data);
    if (insertUserResult) {
      return 'Registrasi berhasil';
    }
  }

  async validateUser(data: LoginUserDto) {
    const user = await this.repository.user.findUserByUsername(data.username);
    if (!user) {
      throw new HttpException(
        'Username atau password salah',
        HttpStatus.BAD_REQUEST,
      );
    }

    const validatePassword = await bcrypt.compare(data.password, user.password);
    if (!validatePassword) {
      throw new HttpException(
        'Username atau password salah',
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  async login(data: LoginUserDto) {
    const user = await this.validateUser(data);

    return {
      accessToken: this.jwtService.sign(
        {
          sub: user.id,
          email: user.email,
          fullname: user.fullname,
          avatar: user.avatar,
        },
        {
          expiresIn: jwtConfig().expired,
          secret: jwtConfig().secret,
        },
      ),
    };
  }

  async getProfile(username: string) {
    return await this.repository.user.getUserDataByUsername(username);
  }

  async changeAvatar(userId: string, file: Express.Multer.File) {
    try {
      const result = await this.cloudinaryService.uploadImage(file);
      const imageUploadedUrl = result.url;
      return await this.repository.user.updateAvatarUrl(
        userId,
        imageUploadedUrl,
      );
    } catch (error: any) {
      if (this.isCloudinaryError(error)) {
        return error.message;
      }
      return error.message;
    }
  }

  isCloudinaryError(
    error: UploadApiErrorResponse,
  ): error is UploadApiErrorResponse {
    return (error as UploadApiErrorResponse) !== undefined;
  }
}
