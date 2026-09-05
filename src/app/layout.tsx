import type { Metadata } from 'next';
import { Fraunces, Manrope } from 'next/font/google';
import { CartProvider } from '@/components/cart/CartProvider';
import { MotionRoot } from '@/components/ui/MotionRoot';
import { SiteUIProvider } from '@/components/ui/SiteUIProvider';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-fc-serif',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-fc-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Frankies Cake — Handcrafted Happiness',
  description:
    'Beautiful cakes, made with love for your sweetest moments. Handcrafted in Amman, delivered with care.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="font-fc-sans">
        <MotionRoot>
          <SiteUIProvider>
            <CartProvider>{children}</CartProvider>
          </SiteUIProvider>
        </MotionRoot>
      </body>
    </html>
  );
}
