import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Martian_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const display = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-display",
});

const description =
  "AI/ML engineer and geoscientist. Lead AI Researcher at Algen AI (Traccia, OpenTelemetry-native governance for AI agents) and doctoral researcher at NIT Rourkela. M.Sc Geology, IIT Kharagpur.";

export const metadata: Metadata = {
  title: "Nutan Kumar Naik",
  description,
  openGraph: {
    title: "Nutan Kumar Naik",
    description,
    type: "profile",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${display.variable}`}>
      <head>
        <meta name="theme-color" content="#f6f5f1" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0e0f11" media="(prefers-color-scheme: dark)" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://accounts.google.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://drive.google.com https://lh3.googleusercontent.com https://*.googleusercontent.com; frame-src 'self' https://docs.google.com https://accounts.google.com; connect-src 'self' https://www.googleapis.com https://accounts.google.com; font-src 'self' data:;"
        />
      </head>
      <body className="font-sans">
        <Navigation />
        <main className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
