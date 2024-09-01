import Header from "./ui/layouts/header";
import Footer from "./ui/layouts/footer";
import { Inter } from "next/font/google";
import "./ui/globals.css";
import SearchBar from "./ui/search-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "See Movies",
  description: "A platform to search and view movie details.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-gray-100 text-gray-900`}>
        <Header />
        <main className="container mx-auto py-6 px-4 h-full">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
