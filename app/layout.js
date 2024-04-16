import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import SessionsProvider from "@/providers/sessionsProvider";

const inter = Inter({ subsets: ["latin"] });

//to check opengraph images sample go to opengraph.xyz
export const metadata = {
  applicationName: "Wrapplet",
  keywords: [
    'newsletter',
    'newsletter builder',
    'newsletter builder tool',
  ],
  metadataBase: new URL('https://wrapplet.com'),
  title: "Wrapplet | Newsletter building and growing platform.",
  description: "Build and grow your newsletter. Capture potential subs and more.",
  openGraph: {
    images: '/opengraph-image.jpeg',
  },
  twitter: {
    images: '/opengraph-image.jpeg',
  },
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SessionsProvider>
            {children}
            <Toaster />
          </SessionsProvider>
        </ThemeProvider>
      </body>
    </html >
  );
}
