import { z } from 'zod';

export const createPostSchema = z
  .object({
    userId: z.string({ message: 'User id wajib diisi' }),
    content: z.string({ message: 'Kamu belum menulis apapun' }),
  })
  .required();

export type CreateUserSchema = z.infer<typeof createPostSchema>;
