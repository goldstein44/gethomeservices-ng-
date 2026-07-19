import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Script from "next/script";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "GetHomeServices NG",
  description: "Book trusted home service professionals in Lagos Island",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="font-sans antialiased">
      <head>
        <Script 
          src="https://js.paystack.co/v1/inline.js" 
          strategy="beforeInteractive" 
        />
        <style>
          {`
            body {
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              text-rendering: optimizeLegibility;
            }
          `}
        </style>
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}