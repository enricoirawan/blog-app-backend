import { z } from 'zod';

export const loginUserSchema = z
  .object({
    username: z.string().min(3, 'Username minimal 3 karakter'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
  })
  .required();

export type LoginUserSchema = z.infer<typeof loginUserSchema>;
