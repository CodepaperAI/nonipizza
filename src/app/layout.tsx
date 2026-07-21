import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { restaurantJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/lib/site";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Noni's Pizza & Wings | Pizza, Wings & Shawarma in Woodstock, ON",
    template: "%s | Noni's Pizza & Wings",
  },
  description: siteConfig.shortDescription,
  applicationName: siteConfig.name,
  keywords: [
    "pizza Woodstock",
    "pizza near me Woodstock",
    "wings Woodstock",
    "shawarma Woodstock",
    "Indian fusion pizza",
    "butter chicken pizza",
    "pizza delivery Woodstock",
  ],
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-CA" className={`${anton.variable} ${inter.variable}`}>
      <body>
        <JsonLd data={restaurantJsonLd()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-maroon focus:px-4 focus:py-2 focus:text-cream"
        >
          Skip to content
        </a>
        <NavBar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
