import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import { InventroyProvider } from '../lib/contexts/inventory-context';
import './globals.css';

const cairo = Cairo({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-cairo',
});

export const metadata: Metadata = {
  title: 'PC Builder',
  description:
    'Build your own PC with ease using our intuitive PC Builder tool. Customize your components, compare prices, and create the perfect setup for your needs.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${cairo.variable} h-full antialiased`}>
      <body className='min-h-full flex flex-col'>
        <InventroyProvider>{children}</InventroyProvider>
      </body>
    </html>
  );
}
