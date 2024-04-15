import Stripe from "stripe";


const brandName = process.env.NEXT_PUBLIC_BRAND_NAME
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
    apiVersion: '2023-10-16',
    appInfo: {
        name: `${brandName} App`,
        version: '0.1.0',
    },
})