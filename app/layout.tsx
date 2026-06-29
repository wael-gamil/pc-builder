import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import { InventroyProvider } from '../lib/contexts/inventory-context';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import AppThemeProvider from '@/providers/AppThemeProvider';
import { cookies } from 'next/headers';
import { ThemeMode } from '@/lib/types/component';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const savedTheme = cookieStore.get('theme-mode')?.value;

  const initialMode: ThemeMode = savedTheme === 'dark' ? 'dark' : 'light';

  return (
    <html lang='en' className={`${cairo.variable} h-full antialiased`}>
      <body className='min-h-full flex flex-col'>
        <InventroyProvider>
          <AntdRegistry>
            <AppThemeProvider initialMode={initialMode}>
              {children}
            </AppThemeProvider>
          </AntdRegistry>
        </InventroyProvider>
      </body>
    </html>
  );
}
