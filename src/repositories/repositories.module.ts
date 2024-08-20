import { Global, Module } from '@nestjs/common';
import { RepositoriesService } from './repositories.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserRepository } from './repository/user-repository';
import { PostRepository } from './repository/post-repository';
import { CommentRepository } from './repository/comment-repository';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [
    RepositoriesService,
    UserRepository,
    PostRepository,
    CommentRepository,
  ],
  exports: [RepositoriesService],
})
export class RepositoriesModule {}
