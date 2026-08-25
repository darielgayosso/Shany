import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mini Arcade Romántico 💖',
  description: 'Un arcade de minijuegos interactivos de amor especialmente diseñado para ti. ¿Podrás superar los 3 juegos y leer la carta secreta?',
  keywords: ['arcade romántico', 'juegos de amor', 'san valentin', 'minijuegos', 'carta secreta'],
  authors: [{ name: 'Dariel' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 antialiased selection:bg-pink-200 selection:text-pink-800">
        {children}
      </body>
    </html>
  );
}
