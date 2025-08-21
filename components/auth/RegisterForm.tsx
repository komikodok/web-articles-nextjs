"use client"
import { Eye, EyeClosed } from "lucide-react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectItem,
    SelectValue
} from "@/components/ui/select"

import { RegisterSchema } from "@/lib/schemas/register.schema"
import { useEffect, useState } from "react"
import { formAnimate, formErrorAnimate } from "@/lib/animates/form.animate"
import { useRouter } from "next/navigation"
import axios from "axios"
import gsap from "gsap"
import { useSession } from "next-auth/react"


const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [hasError, setHasError] = useState<boolean>(false)

    const router = useRouter()
    const { status} = useSession()

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            username: "",
            password: "",
            role: ""
        },
        mode: "onBlur"
    })

    async function handleSubmit(values: z.infer<typeof RegisterSchema>) {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
                username: values.username,
                password: values.password,
                role: values.role
            })

        } catch (err) {
            if (axios.isAxiosError(err)) {
                const errorMessage = err.response?.data
                console.error("Register Failed: ", errorMessage)
            } else {
                console.error("Unexpected Error: ", err)
            }
        }

        gsap.to('#register-form', {
            opacity: 0,
            ease: 'power1.inOut',
            onComplete: () => {
                router.push("/login")
            }
        })
    }

    useEffect(() => {
        formAnimate('.form-item')
    }, [])

    useEffect(() => {
        setHasError(Object.keys(form.formState.errors).length > 0);
    }, [form.formState.errors]);

    useEffect(() => {
        if (hasError) {
            formErrorAnimate('.form-item')
        }
    }, [hasError]);

    return (
        <div id="register-form">
            <h2 className='text-lg font-bold text-[tomato] my-4'>Create an account</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className="form-item">
                                <FormLabel className="!text-black">Username</FormLabel>
                                <FormControl>
                                    <div>
                                        <Input 
                                            placeholder="John Doe" 
                                            {...field} 
                                            className="border-1 outline-none focus-visible:ring-0.5"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage className="text-xs px-1" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="form-item">
                                <FormLabel className="!text-black">Password</FormLabel>
                                <FormControl>
                                    <div className="flex gap-2 items-center">
                                        <Input 
                                            type={`${!showPassword && 'password'}`}
                                            placeholder="*********" 
                                            autoComplete="off"
                                            {...field} 
                                            className="border-1 outline-none focus-visible:ring-0.5"
                                        />

                                        { 
                                            showPassword 
                                            ? 
                                                <Eye onClick={() => setShowPassword(!showPassword)} /> 
                                            : 
                                                <EyeClosed onClick={() => setShowPassword(!showPassword)} />
                                        }
                                    </div>
                                </FormControl>
                                <FormMessage className="text-xs px-1" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem className="form-item">
                                <FormLabel className="!text-black">Role</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="border-1 outline-none focus-visible:ring-0.5">
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="User">User</SelectItem>
                                        <SelectItem value="Admin">Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage className="text-xs px-1" />
                            </FormItem>
                        )}
                    />
                    <button 
                        type="submit" 
                        disabled={!form.formState.isValid}
                        className="button w-full bg-[#e74124] hover:bg-[#f1310f] cursor-pointer text-white font-semibold p-2 rounded-md transition-all duration-500">
                            {status === "loading" ? "Registering..." : "Register"}
                    </button>
                    <p className="font-light flex gap-2">
                        Have already an account? 
                        <span onClick={() => router.push('/login')} className="text-blue-500 hover:underline cursor-pointer">Sign In</span>
                    </p>
                </form>
            </Form>
        </div>
    )
}

export default RegisterForm