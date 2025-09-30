// src/pages/_app.tsx
import '@/app/globals.css'
import type { AppProps } from 'next/app'
import { Inter, Calistoga } from 'next/font/google'
import { useEffect } from 'react';
import emailjs from '@emailjs/browser';

// Load fonts
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  display: 'swap',
})

const calistoga = Calistoga({
  subsets: ["latin"], 
  variable: "--font-serif", 
  weight: ["400"],
  display: 'swap',
})

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init("jkv5jdUmUUO9DhMWO"); 
  }, []);

  return (
    <>
      <style jsx global>{`
        :root {
          --font-sans: ${inter.style.fontFamily};
          --font-serif: ${calistoga.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}