import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

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
    "Corkscrew is a momentum-based 2D platformer set in Rural Britain, 2019. Play as Charlie, a young lad who can turn into a monster, as he battles the psycho kid J to save his cash and his homeland!",
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
    icon: "/images/corkscrew/logo.jpg",
  },
  openGraph: {
    title: "Corkscrew - The Ultimate Momentum-Based Adventure",
    description:
      "A momentum-based 2D platformer set in Rural Britain. Randomly generated levels, HD artstyle, and crass humour await!",
    type: "website",
    images: ["/images/corkscrew/library.jpg"],
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
