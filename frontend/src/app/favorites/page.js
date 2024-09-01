"use client";
import Title from "@/app/ui/title";
import SearchBar from "../ui/search-bar";
import FavoriteListCard from "@/app/ui/favorites/favoritelist-card";
import FavoriteListList from "../ui/favorites/favoritelist-list";
import { fetchFavoriteLists } from "../lib/data";
import { useEffect, useState } from "react";
import CreateFavoriteListDrawer from "@/app/ui/favorites/create-favoritelist-drawer";


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
      <Title>Seus Filmes Favoritos</Title>
      {message && <p>{message}</p>}
      <FavoriteListList favoriteLists={favoriteList} />
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="btn btn-secondary btn-md text-lg fixed bottom-20 left-6 z-[90]"
      >
        + Criar Lista
      </button>
      <CreateFavoriteListDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}/>
    </>
  );
}





