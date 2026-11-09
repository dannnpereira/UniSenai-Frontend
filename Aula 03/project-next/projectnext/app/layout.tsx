import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Calculadora',
  description: 'Calculadora desenvolvida com Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}