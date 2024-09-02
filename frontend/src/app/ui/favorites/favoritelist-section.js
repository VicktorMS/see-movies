'use client';
import React, { useEffect, useState } from "react";
import FavoriteListList from "@/app/ui/favorites/favoritelist-list";
import { fetchFavoriteLists } from "@/app/lib/data";
import CreateFavoriteListDrawer from "@/app/ui/favorites/create-favoritelist-drawer"; 

export default function FavoriteListSection() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [favoriteLists, setFavoriteLists] = useState([]);
  const [message, setMessage] = useState("");

  const loadFavoriteLists = async () => {
    fetchFavoriteLists(setFavoriteLists, setMessage);
  };

  useEffect(() => {
    loadFavoriteLists();
  }, []);

  return (
    <>
      {message && <p>{message}</p>}
      <FavoriteListList favoriteLists={favoriteLists} onUpdate={loadFavoriteLists} />
      <CreateFavoriteListDrawer onUpdate={loadFavoriteLists}/>
    </>
  );
}
