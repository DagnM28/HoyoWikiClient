// app/layout.tsx
import './globals.css';
import { Fira_Sans } from 'next/font/google';

const firasans = Fira_Sans({
  subsets: ['latin'],
  weight: '400',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={firasans.className}>{children}</body>
    </html>
  );
}