import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtGuard } from 'src/lib/jwt/jwt-guard';
import { ZodValidationPipe } from 'src/lib/pipe/zod-validation-pipe';
import { createCommentSchema } from './schema/create-comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly service: CommentService) {}

  @UseGuards(JwtGuard)
  @UsePipes(new ZodValidationPipe(createCommentSchema))
  @Post()
  async createComment(@Req() req, @Body() data: CreateCommentDto) {
    const userId = req.user.user_id;
    return await this.service.createComment(userId, data);
  }

  @UseGuards(JwtGuard)
  @Get('/:postId')
  async getCommentsByPostId(
    @Param('postId') postId: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return await this.service.getCommentsByPostId(postId, page, limit);
  }

  @UseGuards(JwtGuard)
  @Delete('/:comment_id')
  async deleteComment(@Param('comment_id') commentId: string) {
    return await this.service.deleteComment(commentId);
  }
}
