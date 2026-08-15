import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Jatin Gupta | Full-Stack Developer",
  description:
    "Full-Stack Developer from Delhi specializing in React, Node.js, TypeScript, PostgreSQL, MongoDB, and modern web applications.",
  keywords: [
    "Jatin Gupta",
    "Full-Stack Developer",
    "React",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "Portfolio",
  ],
  authors: [{ name: "Jatin Gupta" }],
  openGraph: {
    title: "Jatin Gupta | Full-Stack Developer",
    description:
      "Full-Stack Developer from Delhi specializing in React, Node.js, TypeScript, PostgreSQL, MongoDB, and modern web applications.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jatin Gupta | Full-Stack Developer",
    description:
      "Full-Stack Developer from Delhi specializing in React, Node.js, TypeScript, PostgreSQL, MongoDB, and modern web applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#05070d",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-hidden bg-[#05070d] font-sans text-zinc-100 overscroll-none">
        {children}
      </body>
    </html>
  );
}
