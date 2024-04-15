import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/wrappers/SessionWrapper";
import { signOut } from "next-auth/react";
import Navbar from "@/components/layout/navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "mg template ",
  description: "this is a nextjs tempalte ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">

        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}
