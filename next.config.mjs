/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: [
        //     'utfs.io',
        //     'img.clerk.com',
        //     'files.stripe.com',
        //     'github.com',
        //     'uploadthing.com',
        // ],
        remotePatterns: [
            { hostname: "utfs.io" },
            { hostname: "img.clerk.com" },
            { hostname: "files.stripe.com" },
            { hostname: "github.com" },
            { hostname: "uploadthing.com" },
            // { hostname: "avatars.githubusercontent.com" },
            // { hostname: "www.google.com" },
            // { hostname: "flag.vercel.app" },
            // { hostname: "illustrations.popsy.co" },
        ],
    },
    reactStrictMode: false,
};

export default nextConfig;
