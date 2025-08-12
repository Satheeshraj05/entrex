'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "../theme/ThemeRegistry";
import ClientOnly from "../components/ClientOnly";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientOnly>
          <ThemeRegistry>
            {children}
          </ThemeRegistry>
        </ClientOnly>
      </body>
    </html>
  );
}
