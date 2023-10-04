import type { Metadata } from "next";
import { ToastContainer, Slide } from "react-toastify";
import { ReduxProvider } from "@/redux/provider";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

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
        <ReduxProvider>
          {children}
          <ToastContainer
            autoClose={5000}
            transition={Slide}
            draggablePercent={40}
          />
        </ReduxProvider>
      </body>
    </html>
  );
}
