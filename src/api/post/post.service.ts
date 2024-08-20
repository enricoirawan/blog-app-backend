import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { EditPostDto } from './dto/edit-post.dto';
import { RepositoriesService } from 'src/repositories/repositories.service';
import { PaginationPostWithUser } from 'src/model';

@Injectable()
export class PostService {
  constructor(private readonly repository: RepositoriesService) {}

  async getAllPost(
    page: string,
    limit: string,
  ): Promise<PaginationPostWithUser> {
    //informasi total data keseluruhan
    const totalData: number = await this.repository.post.table.count();
    const data = await this.repository.post.getAllPost(page, limit);
    const totalPage = Math.ceil(totalData / +limit);

    return {
      data,
      totalData,
      currentPage: +page,
      totalPage,
    };
  }

  async createPost(data: CreatePostDto) {
    return await this.repository.post.createPost(data);
  }

  async editPost(data: EditPostDto) {
    return await this.repository.post.editPost(data.id, data);
  }

  async deletePost(id: string) {
    return await this.repository.post.deletePost(id);
  }
}
