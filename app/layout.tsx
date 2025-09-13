import type { Metadata } from "next";
import { Fira_Mono, Roboto, Roboto_Condensed } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
});

const firaMono = Fira_Mono({
  variable: "--font-fira-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Programming Language Guesser",
  description: "Guess the programming language of a code snippet!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoSans.variable} ${firaMono.variable} ${robotoCondensed.variable} antialiased bg-background bg-[radial-gradient(#1A1A1A,transparent_1px)] [background-size:16px_16px] px-8`}
      >
        <Toaster position={"bottom-right"} theme="dark" />
        {children}
      </body>
    </html>
  );
}
