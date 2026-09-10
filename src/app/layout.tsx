import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CvModalProvider } from "@/components/CvModalProvider";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Pablo Barcala | Full Stack Engineer & AI Solutions Builder",
  description:
    "Portfolio de Pablo Barcala. Desarrollo de MVPs, plataformas web escalables con Next.js, .NET y soluciones prácticas de Inteligencia Artificial.",
  keywords: [
    "Pablo Barcala",
    "Full Stack Developer",
    "Next.js 15",
    ".NET 8",
    "React",
    "TypeScript",
    "TDD",
    "Software Engineer Argentina",
    "AI Solutions",
  ],
  authors: [{ name: "Pablo Barcala", url: "https://github.com/pablobarcala" }],
  openGraph: {
    title: "Pablo Barcala | Full Stack Engineer & AI Solutions",
    description:
      "Transformo ideas en productos web de alto impacto, MVPs rápidos e integraciones de IA.",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased transition-colors duration-200">
        <ThemeProvider>
          <LanguageProvider>
            <CvModalProvider>
              {children}
            </CvModalProvider>
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
