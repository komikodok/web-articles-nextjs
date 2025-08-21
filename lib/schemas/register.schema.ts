import { object, string, z } from "zod"

export const RegisterSchema = object({
  username: string()
    .min(1, "Username must be more than 1 character")
    .max(50, "Username must be less than 50 characters"),
  password: string()
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  role: z.enum(["User", "Admin", ""])
})
