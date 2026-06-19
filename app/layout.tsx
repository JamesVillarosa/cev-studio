import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#1d1d1d",
  colorScheme: "dark",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const siteUrl = "https://cev.studio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "cev.studio — Independent design & build studio",
    template: "%s — cev.studio",
  },
  description:
    "An independent studio for brands that refuse to blend in. Brand identity, web development, mobile apps, and 3D — designed and built in-house.",
  keywords: [
    "design studio",
    "web development",
    "mobile apps",
    "brand identity",
    "3D modelling",
    "Next.js",
  ],
  authors: [{ name: "cev.studio" }],
  openGraph: {
    title: "cev.studio — Independent design & build studio",
    description:
      "Brand identity, web development, mobile apps, and 3D — designed and built in-house.",
    url: siteUrl,
    siteName: "cev.studio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "cev.studio",
    description: "An independent studio for brands that refuse to blend in.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="relative min-h-full">{children}</body>
    </html>
  );
}
