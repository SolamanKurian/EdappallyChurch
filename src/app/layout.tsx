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
  title: "Pentecostal Church in Edappally, Kochi | Edappally Church of God",
  description: "Experience Spirit-led worship and Bible teaching at Edappally Church of God—a Christ-centered Pentecostal church in Edappally, Kochi. Join a growing community focused on discipleship, leadership, and spreading the Word across Kerala and India.",
  keywords: [
    "Pentecostal church in Edappally",
    "church in Kochi",
    "church in Ernakulam",
    "Edappally Church of God",
    "Kerala Pentecostal church",
    "Bible-based church Kochi",
    "Sanctuary Publications",
    "Spirit-led church Kerala",
    "Malayalam Bible teaching",
    "disciple-making church India"
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
