import '@/app/globals.css'
import type { AppProps } from 'next/app'
import { Inter, Calistoga } from 'next/font/google'
import { useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Lenis from 'lenis';

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

    // Global smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      lerp: 0.1,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
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