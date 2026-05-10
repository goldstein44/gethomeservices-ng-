import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GetHomeServices NG - Trusted Home Services in Lagos Island",
  description: "Connect directly with verified electricians, plumbers, AC technicians, cleaners and more across Lagos Island. Book instantly via WhatsApp.",
  keywords: ["home services Lagos", "electrician Lekki", "plumber Ajah", "AC repair Victoria Island", "GetHomeServices NG"],
  authors: [{ name: "Kaffa Technologies Ltd" }],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}