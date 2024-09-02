'use client';
import React, { useEffect, useState } from "react";
import FavoriteListList from "@/app/ui/favorites/favoritelist-list";
import { fetchFavoriteLists } from "@/app/lib/data";
import CreateFavoriteListDrawer from "@/app/ui/favorites/create-favoritelist-drawer"; 
import FavoriteListItemSkeleton from "@/app/ui/favorites/favoritelist-item-skeleton";

export default function FavoriteListSection() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [favoriteLists, setFavoriteLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadFavoriteLists = async () => {
    setLoading(true);
    console.log("Loading favorite lists...");
    await fetchFavoriteLists(setFavoriteLists, setMessage);
    setLoading(false);
  };

  useEffect(() => {
    loadFavoriteLists();
  }, []);

  console.log("Render loading:", loading);

  return (
    <>
      {loading ? (
        <div className="movie-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <FavoriteListItemSkeleton key={index} />
          ))}
        </div>
      ) : (
        <FavoriteListList favoriteLists={favoriteLists} onUpdate={loadFavoriteLists} />
      )}
      <CreateFavoriteListDrawer onUpdate={loadFavoriteLists}/>
    </>
  );
}
