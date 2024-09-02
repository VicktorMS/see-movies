'use client';
import React, { Suspense } from "react";
import Title from "@/app/ui/title";
import { CaretLeft } from "@phosphor-icons/react";
import FavoriteListSection from "@/app/ui/favorites/favoritelist-section";
import Link from "next/link";
import { useToast, ToastProvider } from "@/app/ui/toast-context";

export default function FavoriteListsPage() {
  return (
    <ToastProvider>
      <FavoriteListsContent />
    </ToastProvider>
  );
}

function FavoriteListsContent() {
  const { isToastVisible } = useToast();

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
      {isToastVisible && (
        <div className="toast toast-center bottom-20 z-[99]">
          <div className="alert alert-success">
            <span>Link Copiado para a Área de Transferência!</span>
          </div>
        </div>
      )}
    </>
  );
}
