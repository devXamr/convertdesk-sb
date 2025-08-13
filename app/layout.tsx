import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Script from "next/script";
import {Toast} from "next/dist/client/components/react-dev-overlay/ui/components/toast";
import {Toaster} from "sonner";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <head>
      <title>Homepage</title>

    </head>
    <body className={`${geistSans.className} antialiased`}>
    <Toaster richColors/>
    <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
    >
      {children}

    </ThemeProvider>
    <Script
        strategy="afterInteractive"
        id="chatbot-embed"
    >
      {`
    const script = document.createElement('script');
    script.src = '/my-widget.js';
    script.onload = () => {
      window.ConvertDeskChatbot?.init({ botId: "f0817b8c-ff15-4fbd-942e-852fbe10baa7" });
    };
    document.body.appendChild(script);
  `}
    </Script>


    </body>
    </html>
  );
}
