'use client'
import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from './context/auth';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body ><AuthProvider>{children}</AuthProvider></body>
    </html>
  );
}
