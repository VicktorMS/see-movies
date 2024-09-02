import Header from "./ui/layouts/header";
import Footer from "./ui/layouts/footer";
import { Inter } from "next/font/google";
import "./ui/globals.css";
import SearchBar from "./ui/search-bar";
import BottomNavigation from "./ui/bottom-navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "See Movies",
  description: "A platform to search and view movie details.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" data-theme="luxury">
      <body className={`${inter.className}`}>
        <Header />
        <main className="container mx-auto py-6 px-4">
          {children}
        </main>
        <BottomNavigation/>
      </body>
    </html>
  );
}
