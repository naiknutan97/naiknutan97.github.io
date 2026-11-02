import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Silkscreen } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});

const pixel = Silkscreen({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pixel",
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
    <html lang="en" className={`${sans.variable} ${mono.variable} ${pixel.variable}`}>
      <head>
        <meta name="theme-color" content="#061f19" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://accounts.google.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://drive.google.com https://lh3.googleusercontent.com https://*.googleusercontent.com; frame-src 'self' https://docs.google.com https://accounts.google.com; connect-src 'self' https://www.googleapis.com https://accounts.google.com; font-src 'self' data:;"
        />
      </head>
      <body className="bg-paper font-sans text-body">
        <Navigation />
        <main className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 sm:pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
