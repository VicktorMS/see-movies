'use client'
import React, { Suspense } from "react";
import Title from "@/app/ui/title";
import FavoriteListSection from "@/app/ui/favorites/favoritelist-section";
import FavoriteListItemSkeleton from "@/app/ui/favorites/favoritelist-item-skeleton";
import PageBackButton from "../ui/pageback-button";

export default function FavoriteListsPage() {
  return (
    <>
      <div className="flex flex-col justify-center gap-2 mb-3">
        <PageBackButton/>
        <Title>Seus Filmes Favoritos</Title>
      </div>
      <Suspense fallback={<FavoriteListsSkeleton />}>
        <FavoriteListSection />
      </Suspense>
    </>
  );
}



export const FavoriteListsSkeleton = () => {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <FavoriteListItemSkeleton key={index} />
      ))}
    </>
  )
}
