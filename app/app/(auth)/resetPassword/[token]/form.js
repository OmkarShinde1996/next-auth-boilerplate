'use client'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
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
import Link from 'next/link'
import Image from 'next/image'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation';
// import { hash } from 'bcrypt'

const resetPasswordFormSchema = z.object({
    password: z
        .string()
        .min(8, {
            message: "Password must be at least 8 characters.",
        })
        .refine(password => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password), {
            message: "Password must contains at least one upper case letter, one lower case letter,one number, and one special character.",
        }),
    confirmPassword: z
        .string()
        .min(8, {
            message: "Password must be at least 8 characters.",
        })
        .refine(password => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password), {
            message: "Password must contains at least one upper case letter, one lower case letter,one number, and one special character.",
        }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
});


const FormPage = ({ token }) => {
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(resetPasswordFormSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    })
    const isLoading = form.formState.isSubmitting
    //update this details in Account table
    const onSubmit = async (data) => {
        const { password } = data;
        // const hashedPassword = await hash(password, 10);
        try {
            const response = await GlobalAPI.SetNewPassword(password, token)
            if (!response.ok) {
                throw new Error(response.body);
            }
            if (response.status === 200) {
                const result = await response.json()
                console.log({ result });
                console.log(result.status, result.status !== 200);
                if (result.status !== 200) throw new Error(result.body);
                toast({ title: "Success", description: "Password reset successful." });
                router.push("/login");
                router.refresh();
            }
            // Process response here

        } catch (error) {
            toast({ variant: 'destructive', title: "Reset password failed", description: error.message });
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-[80%] md:w-[60%]">
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
                        Set new password
                    </div>

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
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password *</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder="********" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className='w-full text-sm flex flex-row gap-2' disabled={isLoading}>{!isLoading ? 'Reset Password' : <LoaderCircle className='w-4 h-4 animate-spin' />}</Button>
                    <div>
                        <div>
                            <Link href='/login' className='underline text-primary text-xs font-semibold'>{`Go to Login page ->`}</Link>
                        </div>
                    </div>
                </form>
            </Form>

        </>
    )
}

export default FormPage