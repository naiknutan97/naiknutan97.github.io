import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { BackgroundProvider } from "@/providers/BackgroundProvider";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";
import BackgroundRenderer from "@/components/BackgroundRenderer";
import WaveDistortion from "@/components/WaveDistortion";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Nutan Kumar Naik | AI/ML Engineer",
  description:
    "AI/ML Engineer specializing in Agentic AI, AI Observability, and AI Governance. Building production-grade AI systems with OpenTelemetry-native observability.",
  openGraph: {
    title: "Nutan Kumar Naik | AI/ML Engineer",
    description:
      "AI/ML Engineer specializing in Agentic AI, AI Observability, and AI Governance.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 theme-transition selection:bg-[rgb(var(--accent))]/20">
        <ThemeProvider>
          <BackgroundProvider>
            <ScrollProgress />
            <CustomCursor />
            <BackgroundRenderer />
            <WaveDistortion />
            <Navigation />
            <main className="mx-auto max-w-5xl px-6 pb-16 pt-28">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </BackgroundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
