import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ModalProvider from "@/providers/modal-provider";

const font = Urbanist({ subsets: ["latin"], fallback: ["sans-serif"] });

export const metadata: Metadata = {
  title: "store",
  description: "toko online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ModalProvider/>
        <Navbar/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
