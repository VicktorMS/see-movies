'use client'
import React, { Suspense } from "react";
import Title from "@/app/ui/title";
import { CaretLeft } from "@phosphor-icons/react";
import FavoriteListSection from "@/app/ui/favorites/favoritelist-section";
import Link from "next/link";

export default function FavoriteListsPage() {
  return (
    <>
    <div className="flex items-center gap-6 mb-3">
      <Link href="/">
        <CaretLeft size={32} weight="bold" />
      </Link>
      <Title>Seus Filmes Favoritos</Title>
    </div>
      <Suspense fallback={<div>Loading...</div>}>
        <FavoriteListSection />
      </Suspense>
    </>
  );
}
