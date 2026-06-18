import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "El Túnel de Matienzo | Puerto Rico's Premium Auto Detailing",
  description:
    "Professional car wash, detailing, ceramic coatings, memberships, and paint protection in Puerto Rico. Serving Trujillo Alto and surrounding areas.",
  keywords: [
    "Car Wash Puerto Rico",
    "Auto Detailing Puerto Rico",
    "Ceramic Coating Puerto Rico",
    "Car Detailing Trujillo Alto",
    "Auto Spa Puerto Rico",
    "El Túnel de Matienzo",
  ],
  openGraph: {
    title: "El Túnel de Matienzo | Premium Auto Detailing",
    description: "Puerto Rico's #1 luxury auto detailing experience.",
    type: "website",
    locale: "es_PR",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
