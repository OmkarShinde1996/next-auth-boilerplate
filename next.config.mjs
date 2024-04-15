/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'utfs.io',
            'img.clerk.com',
            'files.stripe.com',
            'github.com',
            'uploadthing.com',
        ],
    },
    reactStrictMode: false,
};

export default nextConfig;
