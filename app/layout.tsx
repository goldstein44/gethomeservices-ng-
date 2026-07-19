import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif']
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
        <script src="https://js.paystack.co/v1/inline.js" strategy="beforeInteractive" />
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}