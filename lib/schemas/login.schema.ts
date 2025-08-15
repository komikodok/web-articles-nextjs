import { object, string } from "zod"

export const LoginSchema = object({
    email: string().email("Invalid email"),
    password: string().min(8, "Password must be more than 8 character").max(32, "Password must be less than 32 character"),
})