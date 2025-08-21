import { object, string } from "zod"

export const LoginSchema = object({
    username: string()
        .min(1, "Username must be more than 1 character")
        .max(50, "Username must be less than 50 characters"),
    password: string().min(8, "Password must be more than 8 character").max(32, "Password must be less than 32 character"),
})