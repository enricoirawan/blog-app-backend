import { Prisma } from '@prisma/client';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

export type UserAuth = Prisma.UserGetPayload<{
  select: {
    id: true;
    password: true;
    fullname: true;
    avatar: true;
    email: true;
    username: true;
  };
}>;

export type User = Prisma.UserGetPayload<{
  select: {
    id: true;
    fullname: true;
    avatar: true;
    email: true;
    username: true;
  };
}>;

export type PostWithUser = Prisma.PostGetPayload<{
  include: {
    user: {
      select: {
        avatar: true;
        username: true;
      };
    };
  };
}>;

export type Comment = Prisma.PostCommentGetPayload<{
  include: {
    user: {
      select: {
        avatar: true;
        username: true;
        id: true;
      };
    };
  };
}>;

export type PaginationPostWithUser = {
  data: PostWithUser[];
  currentPage: number;
  totalPage: number;
  totalData: number;
};

export type PaginationComment = {
  data: Comment[];
  currentPage: number;
  totalPage: number;
  totalData: number;
};
