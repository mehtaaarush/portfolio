import type { Metadata } from "next";
import { Caveat, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const hand = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "Aarush Mehta | Data Science & AI Engineer",
  description:
    "Aarush Mehta, a Data Science & AI/ML student, builds agentic RAG systems, ML models and full-stack AI products.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} ${hand.variable} h-full antialiased`}
    >
      <body className="grain min-h-full flex flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}
