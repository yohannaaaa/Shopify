import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/layout/Navbar";
import { Suspense } from "react";
import Footer from "./components/layout/Footer";
import Auth_Provider from "../providers/AuthProvider";
import GlobalProvider from "../providers/GlobalProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>shopify</title>
      </head>
      <body className={inter.className}>
        <Auth_Provider>
          <GlobalProvider>
            <Navbar />
            <Suspense fallback={"Loading..."}>{children}</Suspense>
            <Footer />
          </GlobalProvider>
        </Auth_Provider>
      </body>
    </html>
  );
}
