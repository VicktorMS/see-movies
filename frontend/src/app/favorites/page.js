"use client";
import Title from "@/app/ui/title";
import SearchBar from "../ui/search-bar";
import FavoriteListCard from "@/app/ui/favorites/favoritelist-card";
import FavoriteListList from "../ui/favorites/favoritelist-list";
import { fetchFavoriteLists } from "../lib/data";
import { useEffect, useState } from "react";


export default function Page() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [favoriteList, setFavoriteLists] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchFavoriteLists(setFavoriteLists, setMessage);
  }, []);

  return (
    <>
      <SearchBar />
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="btn btn-secondary btn-md text-lg fixed bottom-20 left-6 z-[90]"
      >
        + Criar Lista
      </button>
      <Title>Seus Filmes Favoritos</Title>
      {message && <p>{message}</p>}
      <FavoriteListList favoriteLists={favoriteList} />
      <BottomDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <p>Conteúdo do Drawer</p>
      </BottomDrawer>
    </>
  );
}



const BottomDrawer = ({ isOpen, onClose, children }) => {
  return (
    <>
      {/* Dark overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } z-40`}
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed inset-x-0 bottom-0 h-2/3 transition-transform transform ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        } bg-base-100 border-t border-secondary shadow-lg z-[100]`}
      >
        <div className="p-4">
          <button onClick={onClose} className="text-right w-full text-gray-500">
            Fechar
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </>
  );
};

