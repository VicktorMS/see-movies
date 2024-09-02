'use client';
import React, { useState } from 'react';
import { removeMovieFromFavoriteList } from '@/app/lib/data';

function RemoveMovieFromFavorite({ listId, movieId, onMovieRemoved }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRemove = async () => {
    if (!confirm("Tem certeza que deseja remover este filme da lista de favoritos?")) {
      return;
    }

    setLoading(true);
    const isRemoved = await removeMovieFromFavoriteList(listId, movieId, setMessage);
    setLoading(false);

    if (isRemoved && onMovieRemoved) {
      onMovieRemoved(movieId); // Chama a função para remover o filme da lista na UI
    }
  };

  return (
    <>
      <button
        onClick={handleRemove}
        className="absolute right-2 top-2 btn btn-error btn-xs z-30"
        disabled={loading}
      >
        {loading ? "Removendo..." : "REMOVER"}
      </button>
      {message && <p className="text-red-500 text-xs mt-2">{message}</p>}
    </>
  );
}

export default RemoveMovieFromFavorite;
