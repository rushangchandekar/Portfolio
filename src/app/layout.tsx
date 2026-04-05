import type { Metadata } from "next";
import { Inter, Calistoga, Geist } from 'next/font/google';
import "./globals.css";
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'})
const calistoga = Calistoga({
  subsets: ["latin"], 
  variable: "--font-serif" , 
  weight: ["400"], })

export const metadata: Metadata = {
  title: "Rushang Chandekar | Data Analyst",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={twMerge(
        geist.variable, 
        calistoga.variable, 
        "bg-gray-900 text-white antialiased font-sans"
        )}
        >
          {children}
        </body>
    </html>
  );
}
