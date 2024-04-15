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
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import Image from 'next/image'
import { LoaderCircle } from 'lucide-react'
// import { hash } from 'bcrypt'

const registerFormSchema = z.object({
    fName: z
        .string()
        .min(2, {
            message: "name must be at least 2 characters.",
        })
        .max(50, {
            message: "name must not be longer than 50 characters.",
        }),
    lName: z
        .string()
        .min(2, {
            message: "name must be at least 2 characters.",
        })
        .max(50, {
            message: "name must not be longer than 50 characters.",
        }),
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
        .refine(password => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password), {
            message: "Password must contain contains at least one upper case letter, one lower case letter,one number, and one special character.",
        }),
    updatesConsent: z.boolean().default(false).optional(),
})

const form = () => {
    const form = useForm({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            fName: '',
            lName: '',
            email: '',
            password: '',
            updatesConsent: true,
        },
    })
    const isLoading = form.formState.isSubmitting

    //update this details in Account table
    const onSubmit = async (data) => {
        const { fName, lName, email, password, updatesConsent } = data;
        // const hashedPassword = await hash(password, 10);
        try {
            const response = await GlobalAPI.RegisterUser(fName, lName, email, password, updatesConsent)
            if (!response.ok) {
                throw new Error(response.body);
            }
            if (response.status === 200) {
                const result = await response.json()
                console.log({result});
                console.log(result.status, result.status !== 200);
                if (result.status !== 200) throw new Error(result.body);
                console.log("Registration Successful", response);
                toast({ title: "Registration Successful1" });
            }
            // Process response here

        } catch (error) {
            console.error("Registration Failed:", error);
            toast({ variant:'destructive', title: "Registration Failed", description: error.message });
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
                        Sign up to get started
                    </div>
                    <div className='flex flex-col md:flex-row md:justify-between md:items-center w-full'>
                        <FormField
                            control={form.control}
                            name="fName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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

                    <FormField
                        control={form.control}
                        name="updatesConsent"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel>
                                    {`I agree to receive updates from ${process.env.NEXT_PUBLIC_BRAND_NAME_SMALL}`}
                                </FormLabel>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className='w-full text-sm flex flex-row gap-2' disabled={isLoading}>{!isLoading ? 'Get Started' : <LoaderCircle className='w-4 h-4 animate-spin'/>}</Button>
                    <div>
                        <div>
                            <span className='text-xs text-muted-foreground'>Already have an account? <Link href='/login' className='underline text-primary text-xs font-semibold'>Log In</Link></span>
                        </div>
                        <div>
                            <span className='text-xs text-muted-foreground'>{`By signing up, I agree to ${process.env.NEXT_PUBLIC_BRAND_NAME_SMALL}'s `}<Link href='#' className='underline text-primary text-xs font-semibold'>Terms and Conditions</Link> {`and`} <Link href='#' className='underline text-primary text-xs font-semibold'>Privacy Policy</Link> </span>
                        </div>
                    </div>
                </form>
            </Form>

        </>
    )
}

export default form