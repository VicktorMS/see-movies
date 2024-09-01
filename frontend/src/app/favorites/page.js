"use client";
import Title from "@/app/ui/title";
import SearchBar from "../ui/search-bar";
import FavoriteListCard from "@/app/ui/favorites/favoritelist-card";
import FavoriteListList from "../ui/favorites/favoritelist-list";
import { fetchFavoriteLists } from "../lib/data";
import { useEffect, useState } from "react";


export default function Page() {

  const [favoriteList, setFavoriteLists] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchFavoriteLists(setFavoriteLists, setMessage);
  }, []); 

  return (
    <>
      <SearchBar/>
      <Title>Seus Filmes Favoritos</Title>
      {message && <p>{message}</p>} 
      <FavoriteListList favoriteLists={favoriteList}/>
    </>
  );
}