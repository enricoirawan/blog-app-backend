import { z } from 'zod';

export const registerUserSchema = z
  .object({
    email: z.string().email('Email tidak valid'),
    fullname: z.string().min(3, 'Nama lengkap minimal 3 karakter'),
    username: z.string().min(3, 'Username minimal 3 karakter'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
  })
  .required();

export type RegisterUserSchema = z.infer<typeof registerUserSchema>;
