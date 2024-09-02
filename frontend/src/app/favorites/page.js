'use client'
import React, { Suspense } from "react";
import Title from "@/app/ui/title";
import { CaretLeft } from "@phosphor-icons/react";
import FavoriteListSection from "@/app/ui/favorites/favoritelist-section"; 
import Link from "next/link";

export default function FavoriteListsPage() {
  return (
    <>
    <div>
      <Link href="/" className="text-lg font-semibold">
        <CaretLeft size={32} />
      </Link>
      <Title>Seus Filmes Favoritos</Title>
    </div>
      <Suspense fallback={<div>Loading...</div>}>
        <FavoriteListSection />
      </Suspense>
    </>
  );
}
