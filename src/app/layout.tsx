import type { Metadata } from "next";
import "./globals.css";
import SessionWrapper from "@/components/wrappers/SessionWrapper";
import LayoutWrapper from "@/components/wrappers/LayoutWrapper";
import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils"
import { Inter as FontSans } from "next/font/google"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

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
    <TRPCReactProvider>
      <SessionWrapper>
        <html lang="en" className="">

          <body
            className={cn(
              "min-h-screen bg-background font-sans  antialiased",
            )}

          >
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </body>
        </html>
      </SessionWrapper>
    </TRPCReactProvider>
  );
}
