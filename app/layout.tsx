import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Chewy, Caveat } from "next/font/google";
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

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const chewy = Chewy({
  variable: "--font-chewy",
  subsets: ["latin"],
  weight: "400",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Rate Things",
  description: "Upload anything food, clothes, activities and get ratings and comments from others.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <head>
        <link rel="shortcut icon" href="/vercel.svg" type="image/x-icon" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${chewy.variable} ${caveat.variable} antialiased`}
      >
        <CreateButton />
        {children}
      </body>
    </html>
  );
}
