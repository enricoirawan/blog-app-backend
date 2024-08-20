import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Comment } from 'src/model';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  get table() {
    return this.prisma.postComment;
  }

  async createComment(comment: Prisma.PostCommentCreateManyInput) {
    return await this.table.create({ data: comment });
  }

  async getCommentsByPostId(
    postId: string,
    page: string,
    limit: string,
  ): Promise<Comment[]> {
    const skip = (Number(page) - 1) * Number(limit);
    return await this.table.findMany({
      where: {
        postId,
      },
      include: {
        user: {
          select: {
            avatar: true,
            username: true,
            id: true,
          },
        },
      },
      take: +limit,
      skip,
    });
  }

  async deleteComment(id: string) {
    return await this.table.delete({
      where: {
        id,
      },
    });
  }

  async getTotalCommentsByPostId(postId: string) {
    return await this.table.count({
      where: {
        postId,
      },
    });
  }
}
