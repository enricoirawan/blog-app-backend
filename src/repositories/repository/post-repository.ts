import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PostWithUser } from 'src/model';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  get table() {
    return this.prisma.post;
  }

  async getAllPost(page: string, limit: string): Promise<PostWithUser[]> {
    const skip = (Number(page) - 1) * Number(limit);
    return await this.table.findMany({
      include: {
        user: {
          select: {
            avatar: true,
            username: true,
          },
        },
      },
      take: +limit,
      skip,
    });
  }

  async createPost(post: Prisma.PostCreateManyInput) {
    return await this.table.create({ data: post });
  }

  async editPost(id: string, post: Prisma.PostUpdateInput) {
    return await this.table.update({
      where: {
        id,
      },
      data: {
        ...post,
        updatedAt: new Date(),
      },
    });
  }

  async deletePost(id: string) {
    return await this.table.delete({
      where: {
        id,
      },
    });
  }
}
