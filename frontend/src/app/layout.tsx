import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quaestum Desafio",
  description: "Desafio inicial quaestum",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} h-full bg-gray-100 dark:bg-gray-800`}
      >
        <NavBar></NavBar>
        {children}
      </body>
    </html>
  );
}
