import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const description =
  "Lead AI Researcher at Algen AI and doctoral researcher at NIT Rourkela. Geoscientist (M.Sc, IIT Kharagpur) working on AI observability, machine learning and subsurface, water and environmental data.";

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
    <html lang="en" className={inter.variable}>
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://accounts.google.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://drive.google.com https://lh3.googleusercontent.com https://*.googleusercontent.com; frame-src https://docs.google.com https://accounts.google.com; connect-src 'self' https://www.googleapis.com https://accounts.google.com; font-src 'self' data:;"
        />
      </head>
      <body className="bg-paper font-sans text-ink">
        <Navigation />
        <main className="mx-auto max-w-3xl px-4 pb-16 pt-10 sm:px-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
