import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
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
    <html lang="en" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://accounts.google.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://drive.google.com https://lh3.googleusercontent.com https://*.googleusercontent.com; frame-src 'self' https://docs.google.com https://accounts.google.com; connect-src 'self' https://www.googleapis.com https://accounts.google.com; font-src 'self' data:;"
        />
        {/* Apply the saved theme before first paint to avoid a flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
      </head>
      <body className="bg-paper font-sans text-ink">
        <Navigation />
        <main className="mx-auto max-w-5xl px-4 pt-12 sm:px-6 sm:pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
