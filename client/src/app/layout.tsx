import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Poppins, Russo_One } from 'next/font/google';
import '../app/globals.css';

// Font configuration
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const russoOne = Russo_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-russo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'GameStore - Your Ultimate Gaming Destination',
  description: 'Shop for the latest games, gaming hardware, and merchandise all in one place.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${russoOne.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="app flex-grow">
          <div className="main-content">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}