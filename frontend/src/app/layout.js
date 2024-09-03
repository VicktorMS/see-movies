import PageHeader from "@/app/ui/layouts/page-header";
import { Inter } from "next/font/google";
import "./ui/globals.css";
import { ToastProvider } from '@/app/ui/toast-context';
import BottomNavigation from "./ui/bottom-navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "See Movies",
  description: "A platform to search and view movie details.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" data-theme="black">
      <body className={`${inter.className}`}>
        <PageHeader />
        <ToastProvider>
          <main className="container mx-auto py-6 px-4">
            {children}
          </main>
        </ToastProvider>
        <BottomNavigation/>
      </body>
    </html>
  );
}
