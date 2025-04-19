import type { Metadata } from 'next';
import Providers from './providers';
import { Stack } from '@mui/material';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Product Catalog',
  description: 'Browse our catalog of games, hardware, and merchandise',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Stack minHeight={'100vh'}>
            <Navbar />
            <main style={{ flex: 1 }}>
              {children}
            </main>
            <Footer />
          </Stack>
        </Providers>
      </body>
    </html>
  );
}