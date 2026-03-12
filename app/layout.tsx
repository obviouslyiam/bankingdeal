import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: {
    default: "BankingDeal — Compare Bank Rates, Accounts & Financial Products",
    template: "%s | BankingDeal"
  },
  description: "Compare the best bank rates, savings accounts, CDs, credit cards, and mortgage rates. Find the best banking deals and make smarter financial decisions.",
  metadataBase: new URL("https://bankingdeal.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
