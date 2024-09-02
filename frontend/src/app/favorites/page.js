"use client";
import Title from "@/app/ui/title";
import SearchBar from "../ui/search-bar";
import FavoriteListList from "../ui/favorites/favoritelist-list";
import { fetchFavoriteLists } from "../lib/data";
import { useEffect, useState } from "react";
import CreateFavoriteListDrawer from "@/app/ui/favorites/create-favoritelist-drawer";
import Link from "next/link";

export default function Page() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [favoriteLists, setFavoriteLists] = useState([]);
  const [message, setMessage] = useState("");

  // Função para carregar as listas de favoritos
  const loadFavoriteLists = async () => {
    fetchFavoriteLists(setFavoriteLists, setMessage);
  };

  useEffect(() => {
    loadFavoriteLists(); // Carrega as listas ao montar o componente
  }, []);

  return (
    <>
      <SearchBar />
      <Link href={"/"} className="btn btn-primary btn-md text-lg">Descobrir filmes</Link>
      <Title>Seus Filmes Favoritos</Title>
      {message && <p>{message}</p>}
      <FavoriteListList favoriteLists={favoriteLists} onUpdate={loadFavoriteLists} />
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="btn btn-secondary btn-md text-lg fixed bottom-20 left-6 z-[90]"
      >
        + Criar Lista
      </button>
      <CreateFavoriteListDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}
