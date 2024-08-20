import { z } from 'zod';

export const editPostSchema = z
  .object({
    id: z.string({ message: 'Id tidak ditemukan' }),
    content: z.string({ message: 'Kamu belum menulis apapun' }),
  })
  .required();

export type EditPostSchema = z.infer<typeof editPostSchema>;
