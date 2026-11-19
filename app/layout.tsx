import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// The font variable sits on <html>: the Reader shell tokens live on :root and read it from there.
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Field / Book | Seasonal crop notes | Bookchaowalit",
  description: "A quiet fieldbook of illustrative crop notes: growing window, water, soil and a six-week visit plan for okra, Thai basil and morning glory.",
  authors: [{ name: "Bookchaowalit", url: "https://bookchaowalit.com" }],
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: "Bookchaowalit", title: "Field / Book | Seasonal crop notes", description: "Illustrative crop notes with a six-week visit plan." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={geistSans.variable}><body>{children}</body></html>;
}
