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

import { LoginSchema } from "@/lib/schemas/login.schema"
import { useEffect, useState } from "react"
import { formAnimate, formErrorAnimate } from "@/lib/animate/form.animate"
import { useRouter } from "next/navigation"


const LoginForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [hasError, setHasError] = useState<boolean>(false)

    const router = useRouter()

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    function handleSubmit(values: z.infer<typeof LoginSchema>) {
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
        <h2 className='text-lg font-bold '>Sign In</h2>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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

                <Button color="white" type="submit" className="w-full">Register</Button>
                <p className="font-light flex gap-2">
                    Don&apos;t have an acount yet?
                    <span onClick={() => router.push('/register')} className="text-blue-500 hover:underline cursor-pointer">Sign Up</span>
                </p>
            </form>
        </Form>
        </>
    )
}

export default LoginForm