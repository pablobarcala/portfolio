import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import CursorGlow from "@/components/CursorGlow";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Pablo Barcala | Full Stack developer | Next.js + .NET + MongoDB",
  description: "Portfolio personal de Pablo Barcala, desarrollador web.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased bg-neutral-950 text-neutral-100`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <CursorGlow />
      </body>
    </html>
  );
}
