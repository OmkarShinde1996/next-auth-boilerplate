const RegisterUser = async (fName, lName, email, password, updatesConsent) => {
    const headers = {
        'Content-Type': 'application/json',
    }
    return await fetch(process.env.NEXT_PUBLIC_NEXTAUTH_URL + 'api/auth/register', {
        method: 'POST',
        headers,
        body: JSON.stringify({ fName, lName, email, password, updatesConsent }),
    })
}

const ResetPassword = async (email) => {
    const headers = {
        'Content-Type': 'application/json',
    }
    return await fetch(process.env.NEXT_PUBLIC_NEXTAUTH_URL + 'api/auth/reset-password', {
        method: 'POST',
        headers,
        body: JSON.stringify({ email }),
    })
}

const SetNewPassword = async (password, token) => {
    const headers = {
        'Content-Type': 'application/json',
    }
    return await fetch(process.env.NEXT_PUBLIC_NEXTAUTH_URL + 'api/auth/set-new-password', {
        method: 'POST',
        headers,
        body: JSON.stringify({ password, token }),
    })
}

export default {
    RegisterUser,
    ResetPassword,
    SetNewPassword,
}