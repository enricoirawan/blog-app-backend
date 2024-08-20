import { Injectable } from '@nestjs/common';
import { PaginationComment } from 'src/model';
import { RepositoriesService } from 'src/repositories/repositories.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './entity/comment.entity';

@Injectable()
export class CommentService {
  constructor(private readonly repository: RepositoriesService) {}

  async createComment(userId: string, data: CreateCommentDto) {
    const commentEntity: CommentEntity = {
      comment: data.comment,
      postId: data.postId,
      userId: userId,
    };
    return await this.repository.comment.createComment(commentEntity);
  }

  async getCommentsByPostId(
    postId: string,
    page: string,
    limit: string,
  ): Promise<PaginationComment> {
    const totalData =
      await this.repository.comment.getTotalCommentsByPostId(postId);
    const totalPage = Math.ceil(totalData / +limit);
    const data = await this.repository.comment.getCommentsByPostId(
      postId,
      page,
      limit,
    );
    return {
      data,
      currentPage: +page,
      totalData: totalData,
      totalPage: totalPage,
    };
  }

  async deleteComment(commentId: string) {
    return await this.repository.comment.deleteComment(commentId);
  }
}
