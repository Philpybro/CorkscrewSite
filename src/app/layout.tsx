import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const basePath = "/CorkscrewSite";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Corkscrew - The Ultimate Momentum-Based Adventure",
  description:
    "Corkscrew is a Cornish momentum-based 2D platformer set in 2019. Play as Charlie, a cool kid with an even cooler power up, as he battles the psychotic Jam to save the world, and more importantly, his money!",
  keywords: [
    "Corkscrew",
    "platformer",
    "momentum-based",
    "Indie Game",
    "2D Platformer",
    "CharlieDoesStuff",
    "Sonic-like",
  ],
  authors: [{ name: "CharlieDoesStuff" }],
  icons: {
    icon: `${basePath}/images/corkscrew/icon.png`,
  },
  openGraph: {
    title: "Corkscrew - The Ultimate Momentum-Based Adventure",
    description:
      "A momentum-based 2D platformer set in Rural Britain. Randomly generated levels, HD artstyle, and crass humour await!",
    type: "website",
    images: [`${basePath}/images/corkscrew/library.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${inter.variable} antialiased`}
        style={{ background: "linear-gradient(180deg, #87CEEB 0%, #B0E0F6 30%, #E0F0FF 60%, #D0E8FF 100%)" }}
      >
        {children}
      </body>
    </html>
  );
}
