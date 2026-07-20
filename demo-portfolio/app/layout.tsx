import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DEMO | Fullstack Developer",
  description: "Portfolio of DEMO - Fullstack Developer specializing in React, Next.js, and 3D web experiences",
  keywords: ["developer", "fullstack", "react", "nextjs", "threejs", "portfolio"],
  authors: [{ name: "DEMO" }],
  openGraph: {
    title: "DEMO | Fullstack Developer",
    description: "Crafting digital experiences at the intersection of design and technology",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
