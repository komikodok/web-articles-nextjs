"use client"
import { Eye, EyeClosed } from "lucide-react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { RegisterSchema } from "@/lib/schemas/register.schema"
import { useEffect, useState } from "react"
import { formAnimate, formErrorAnimate } from "@/lib/animate/form.animate"
import { useRouter } from "next/navigation"


const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
    const [hasError, setHasError] = useState<boolean>(false)

    const router = useRouter()

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    function handleSubmit(values: z.infer<typeof RegisterSchema>) {
        console.log(values)
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
        <>
        <h2 className='text-lg font-bold '>Create an account</h2>
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
                    name="email"
                    render={({ field }) => (
                        <FormItem className="form-item">
                            <FormLabel className="!text-black">Email</FormLabel>
                            <FormControl>
                                <div>
                                    <Input 
                                        placeholder="johndoe@example.com"
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

                                    { showPassword ? <Eye onClick={() => setShowPassword(!showPassword)} /> : <EyeClosed onClick={() => setShowPassword(!showPassword)} />}
                                </div>
                            </FormControl>
                            <FormMessage className="text-xs px-1" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem className="form-item">
                            <FormLabel className="!text-black">Confirm Password</FormLabel>
                            <FormControl>
                                <div className="flex gap-2 items-center">
                                    <Input 
                                        type={`${!showConfirmPassword && 'password'}`}
                                        placeholder="*********" 
                                        autoComplete="off"
                                        {...field} 
                                        className="border-1 outline-none focus-visible:ring-0.5"
                                    />
                                    { showConfirmPassword ? <Eye onClick={() => setShowConfirmPassword(!showConfirmPassword)} /> : <EyeClosed onClick={() => setShowConfirmPassword(!showConfirmPassword)} />}
                                </div>
                            </FormControl>
                            <FormMessage className="text-xs px-1" />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">Register</Button>
                <p className="font-light flex gap-2">
                    Have already an account? 
                    <span onClick={() => router.push('/login')} className="text-blue-500 hover:underline cursor-pointer">Sign In</span>
                </p>
            </form>
        </Form>
        </>
    )
}

export default RegisterForm