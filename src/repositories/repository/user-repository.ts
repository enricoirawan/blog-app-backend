import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { User, UserAuth } from 'src/model';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  get table() {
    return this.prisma.user;
  }

  async findUserByUsername(username: string): Promise<UserAuth> {
    return await this.table.findFirst({
      where: {
        username,
      },
    });
  }

  async findUserByEmail(email: string): Promise<UserAuth> {
    return await this.table.findFirst({
      where: {
        email,
      },
    });
  }

  async insertUser(user: Prisma.UserCreateInput) {
    return await this.table.create({ data: user });
  }

  async getUserDataByUsername(username: string): Promise<User> {
    return await this.table.findFirst({
      where: {
        username,
      },
      select: {
        id: true,
        avatar: true,
        email: true,
        fullname: true,
        username: true,
      },
    });
  }

  async updateAvatarUrl(id: string, url: string): Promise<User> {
    return await this.table.update({
      where: {
        id,
      },
      data: {
        avatar: url,
      },
      select: {
        id: true,
        avatar: true,
        email: true,
        fullname: true,
        username: true,
      },
    });
  }
}
