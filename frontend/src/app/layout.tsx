import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar";
// import Footer from "./components/footer";
import { CartProvider } from "./components/cartContext";

export const metadata: Metadata = {
  title: "E-commerce Shopping Platform",
  description: "E-commerce platform for all your shopping needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar/>
          {children}
          {/* <Footer/> */}
        </CartProvider>
      </body>
    </html>
  );
}
