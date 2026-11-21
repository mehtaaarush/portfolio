import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Caveat, Figtree, JetBrains_Mono } from "next/font/google";

import { Providers } from "@/components/site/providers";
import "./globals.css";

const heading = Bricolage_Grotesque({
  variable: "--nf-heading",
  subsets: ["latin"],
  axes: ["opsz"],
});

const body = Figtree({
  variable: "--nf-body",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--nf-mono",
  subsets: ["latin"],
});

const hand = Caveat({
  variable: "--nf-hand",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "Aarush Mehta · Data Science & AI/ML student, Class of 2027",
  description:
    "Aarush Mehta is a final-year B.Tech CSE student at UPES Dehradun (Data Science & AI/ML, Class of 2027) building forecasting, experimentation, analytics and retrieval-augmented AI projects, most with live demos.",
};

export const viewport: Viewport = {
  themeColor: "#07080d",
};

/* Runs before first paint so the page never flashes the wrong theme. Dark is the default; light only if the visitor picked it. */
const themeScript = `var d=document.documentElement;try{if(localStorage.getItem("theme")!=="light")d.classList.add("dark")}catch(e){d.classList.add("dark")}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${heading.variable} ${body.variable} ${mono.variable} ${hand.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
