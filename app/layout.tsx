import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CreateButton from "@/components/root/createButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"], 
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rate Things",
  description: "Upload anything food, clothes, activities and get ratings and comments from others.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CreateButton />
        {children}
      </body>
    </html>
  );
}
