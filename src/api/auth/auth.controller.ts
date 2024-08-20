import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/lib/pipe/zod-validation-pipe';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { loginUserSchema } from './schema/login-user.schema';
import { registerUserSchema } from './schema/register-user.schema';
import { JwtGuard } from 'src/lib/jwt/jwt-guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('register')
  @UsePipes(new ZodValidationPipe(registerUserSchema))
  async registerUser(@Body() data: RegisterUserDto) {
    return await this.service.register(data);
  }

  @UsePipes(new ZodValidationPipe(loginUserSchema))
  @Post('login')
  async loginUser(@Body() data: LoginUserDto) {
    return await this.service.login(data);
  }

  @UseGuards(JwtGuard)
  @Get('profile')
  async getProfile(@Req() req: any) {
    return await this.service.getProfile(req.user.username);
  }

  @UseGuards(JwtGuard)
  @Post('profile/avatar')
  @UseInterceptors(FileInterceptor('file'))
  async changeAvatar(
    @Req() req: any,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const userId = req.user.user_id;
    return await this.service.changeAvatar(userId, file);
  }
}
