'use client'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { signIn } from "next-auth/react";
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import GlobalAPI from '@/services/GlobalAPI'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import Image from 'next/image'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation';

const loginFormSchema = z.object({
    email: z
        .string({
            required_error: "Please enter an email to display.",
        })
        .email(),
    password: z
        .string()
        .min(8, {
            message: "Password must be at least 8 characters.",
        })
        .refine(password => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password), {
            message: "Password must contain both numbers and characters.",
        }),
})

const LoginForm = () => {
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })
    const isLoading = form.formState.isSubmitting

    //update this details in Account table
    const onSubmit = async (data) => {
        const { email, password } = data;
        try {
            const response = await signIn("credentials", { email, password, redirect: false });
            console.log({ response });
            if (!response?.error) {
                router.push("/");
                router.refresh();
            }
            if (!response.ok) {
                throw new Error('Invalid credentials');
            }
            if (response?.error) {
                throw new Error('Invalid credentials');
            }
            toast({ title: "Login Successful" });

        } catch (error) {
            console.error("Login Failed:", error);
            toast({ variant: 'destructive', title: "Login Failed", description: error.message });
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-[85%] md:w-[70%] ">
                    <div className='w-full'>
                        <Image
                            src={'/longLogo.svg'}
                            width={250}
                            height={100}
                            alt='wrapplet logo'
                            className='-ml-3'
                        />
                    </div>
                    <div className="text-2xl font-bold tracking-wide">
                        Login to get started
                    </div>

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email *</FormLabel>
                                <FormControl>
                                    <Input placeholder="name@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password *</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder="********" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div>
                        <Link href='/resetPassword' className='text-primary text-xs font-semibold'>Forgot password</Link>
                    </div>

                    <Button type="submit" className='w-full text-sm flex flex-row gap-2' disabled={isLoading}>{!isLoading ? 'Get Started' : <LoaderCircle className='w-4 h-4 animate-spin' />}</Button>
                    <div>
                        <div>
                            <span className='text-xs text-muted-foreground'>Don't have an account? <Link href='/register' className='underline text-primary text-xs font-semibold'>Create one</Link></span>
                        </div>
                    </div>
                </form>
            </Form>

        </>
    )
}

export default LoginForm