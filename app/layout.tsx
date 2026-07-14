import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      <body className="font-sans">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}