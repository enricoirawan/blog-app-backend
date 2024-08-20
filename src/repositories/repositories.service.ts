import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user-repository';
import { PostRepository } from './repository/post-repository';
import { CommentRepository } from './repository/comment-repository';

@Injectable()
export class RepositoriesService {
  constructor(
    private readonly _user: UserRepository,
    private readonly _post: PostRepository,
    private readonly _comment: CommentRepository,
  ) {}

  get user() {
    return this._user;
  }

  get post() {
    return this._post;
  }

  get comment() {
    return this._comment;
  }
}
