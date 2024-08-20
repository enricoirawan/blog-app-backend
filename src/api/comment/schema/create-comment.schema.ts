import { z } from 'zod';

export const createCommentSchema = z
  .object({
    postId: z.string({ message: 'postId harus diisi' }),
    comment: z.string({ message: 'Kamu belum menulis komentar' }),
  })
  .required();

export type CreateCommentSchema = z.infer<typeof createCommentSchema>;
