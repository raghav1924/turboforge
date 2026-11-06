import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'my-new-app — Modern SaaS',
  description: 'Built with Turboforge Full-Stack Monorepo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-neutral-950 text-neutral-100 antialiased selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
