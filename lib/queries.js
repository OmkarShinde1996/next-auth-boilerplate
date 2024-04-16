"use server"

import { redirect } from "next/navigation"
import { db } from "./db"
import { add } from 'date-fns';
import { v4 } from "uuid"

export const getAuthUserDetails = async () => {
    const user = await currentUser()
    if (!user) return
    const userData = await db.user.findUnique({
        where: {
            email: user.emailAddresses[0].emailAddress,
        },
        include: {
            Account: {
                include: {
                    Credits: true,
                },
            },
        },
    })

    return userData
}

export const getUserByEmail = async (email) => {
    const user = await db.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
            email: true,
            fName: true,
            lName: true,
            avatarUrl: true,
        },
    })
    return user
}

export const getUserByEmailOnServer = async (email) => {
    const user = await db.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
            email: true,
            password: true,
            fName: true,
            lName: true,
            avatarUrl: true,
        },
    })
    return user
}

export const createUser = async (user) => {
    if (!user) return null
    const response = await db.user.create({ data: { ...user } })
    return response
}


export const registerUser = async (fName, lName, email, hashedPassword, updatesConsent) => {
    const userDetails = await createUser({
        fName,
        lName,
        avatarUrl: '',
        role: 'USER',
        email,
        password: hashedPassword,
        updatesConsent,
        createdAt: new Date(),
        updatedAt: new Date(),
    })
    if (!userDetails) {
        throw new Error("Error in creating user")
        // return null
    }

    return userDetails;
}

export const getUser = async (email) => {
    const user = await db.user.findUnique({
        where: {
            email,
        },
    })
    return user
}

export const deleteUser = async (userId) => {
    const deletedUser = await db.user.delete({ where: { id: userId } })

    return deletedUser
}

export const getUserByResetPasswordToken = async (token) => {
    const user = await db.user.findMany({
        where: {
            emailResetPassword: token,
        },
        select: {
            email: true,
            emailResetPassword: true,
            passwordResetTokenExpires: true,
        },
    });
    return user
}

export const updateResetPasswordToken = async (token, email) => {
    const expirationTime = add(new Date(), { hours: 3 });
    const updatedResetPasswordToken = await db.user.update({
        where: {
            email,
        },
        data: {
            emailResetPassword: token,
            passwordResetTokenExpires: expirationTime,
            updatedAt: new Date(),
        },
    })

    if (!updatedResetPasswordToken) {
        throw new Error("Error in updating reset password token");
        // return null;
    }

    return updatedResetPasswordToken;
}

export const updatePassword = async (email, hashedPassword) => {
    const updatedNewPassword = await db.user.update({
        where: {
            email,
        },
        data: {
            password: hashedPassword,
            emailResetPassword: '',
            passwordResetTokenExpires: null,
            updatedAt: new Date(),
        },
    })

    if (!updatedNewPassword) {
        throw new Error("Error in updating reset password token");
        // return null;
    }

    return updatedNewPassword;
}
