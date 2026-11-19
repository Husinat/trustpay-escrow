import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://trustpay-escrow.vercel.app'),
  title: {
    default: "TrustPay Escrow",
    template: "%s | TrustPay Escrow",
  },
  description: "Secure Escrow for Freelancers and Clients on the Stellar Network",
  openGraph: {
    title: "TrustPay Escrow",
    description: "Secure Escrow for Freelancers and Clients on the Stellar Network",
    url: "https://trustpay-escrow.vercel.app",
    siteName: "TrustPay Escrow",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrustPay Escrow",
    description: "Secure Escrow for Freelancers and Clients on the Stellar Network",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* FOUC prevention script - runs before theme provider hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const shouldUseDark = theme === 'dark' || (theme === 'system' && prefersDark) || (!theme && prefersDark);
                document.documentElement.setAttribute('data-theme', shouldUseDark ? 'dark' : 'light');
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem storageKey="theme">
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
