import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import GlobalAudioControl from "./components/GlobalAudioControl";
import FooterWrapper from "./components/FooterWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Edappally Pentecostal Church & Sanctuary Publications | Spirit-Filled Worship & Christian Publishing in Kochi",
  description: "Edappally Pentecostal Church & Sanctuary Publications — a spirit-filled Christian church and gospel publishing ministry based in Kochi, Kerala. Join us for worship and explore our gospel resources.",
  keywords: [
    "Pentecostal Church Edappally",
    "Edappally Church",
    "Churches in Kochi",
    "Spirit-Filled Worship",
    "Kerala Pentecostal Churches",
    "Christian Church Edappally",
    "Sanctuary Church Edappally",
    "Sanctuary Publications",
    "Christian Publishers Edappally",
    "Gospel Publications Kerala"
  ],
  icons: {
      icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" type="image/x-icon" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <FooterWrapper />
          <GlobalAudioControl />
        </div>
      </body>
    </html>
  );
}
