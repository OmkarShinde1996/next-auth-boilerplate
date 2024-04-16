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

const resetPasswordFormSchema = z.object({
    email: z
        .string({
            required_error: "Please enter an email to display.",
        })
        .email(),
})


const FormPage = () => {
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(resetPasswordFormSchema),
        defaultValues: {
            email: '',
        },
    })
    const isLoading = form.formState.isSubmitting
    //update this details in Account table
    const onSubmit = async (data) => {
        const { email } = data;
        try {
            const response = await GlobalAPI.ResetPassword(email)
            if (!response.ok) {
                throw new Error(response.body);
            }
            if (response.status === 200) {
                const result = await response.json()
                console.log({result});
                console.log(result.status, result.status !== 200);
                if (result.status !== 200) throw new Error(result.body);
                toast({ title: "If the email is associated with an account, a password reset email will be sent." });
            }
            // Process response here

        } catch (error) {
            toast({ variant:'destructive', title: "Reset password failed", description: error.message });
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-[80%] md:w-[60%]">
                    <Link href={`${process.env.NEXT_PUBLIC_URL}`} className='w-full'>
                        <Image
                            src={'/longLogo.svg'}
                            width={250}
                            height={100}
                            alt='wrapplet logo'
                            className='-ml-3'
                        />
                    </Link>
                    <div className="text-2xl font-bold tracking-wide">
                        Enter your registered email id
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

                    <Button type="submit" className='w-full text-sm flex flex-row gap-2' disabled={isLoading}>{!isLoading ? 'Submit' : <LoaderCircle className='w-4 h-4 animate-spin' />}</Button>
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