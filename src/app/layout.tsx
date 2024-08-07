import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Asistencia JAJ 2024",
  description: "Asistencia para la JAJ 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.className}>
      <body className="min-h-screen w-screen flex flex-col">
        <Header />
        <main className="flex-grow w-full overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
