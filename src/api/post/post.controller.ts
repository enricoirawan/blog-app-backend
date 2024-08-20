import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtGuard } from 'src/lib/jwt/jwt-guard';
import { ZodValidationPipe } from 'src/lib/pipe/zod-validation-pipe';
import { PaginationPostWithUser } from 'src/model';
import { CreatePostDto } from './dto/create-post.dto';
import { EditPostDto } from './dto/edit-post.dto';
import { PostService } from './post.service';
import { createPostSchema } from './schema/create-post.schema';
import { editPostSchema } from './schema/edit-post.schema';

@Controller('post')
export class PostController {
  constructor(private readonly service: PostService) {}

  @UseGuards(JwtGuard)
  @Get()
  async getAllPost(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<PaginationPostWithUser> {
    return await this.service.getAllPost(page, limit);
  }

  @UseGuards(JwtGuard)
  @UsePipes(new ZodValidationPipe(createPostSchema))
  @Post()
  async createPost(@Body() data: CreatePostDto) {
    return await this.service.createPost(data);
  }

  @UseGuards(JwtGuard)
  @UsePipes(new ZodValidationPipe(editPostSchema))
  @Patch()
  async editPost(@Body() data: EditPostDto) {
    return await this.service.editPost(data);
  }

  @UseGuards(JwtGuard)
  @Delete('/:id')
  async deletePost(@Param('id') postId) {
    return await this.service.deletePost(postId);
  }
}
