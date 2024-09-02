'use client';
import React, { useState } from 'react';
import { removeMovieFromFavoriteList } from '@/app/lib/data';
import { useToast } from '@/app/ui/toast-context';

function RemoveMovieFromFavorite({ listId, movieId, onMovieRemoved }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { showToast } = useToast();

  const handleRemove = async () => {

    setLoading(true);
    const isRemoved = await removeMovieFromFavoriteList(listId, movieId, setMessage);
    setLoading(false);

    if (isRemoved && onMovieRemoved) {
      onMovieRemoved(movieId);
      showToast({
        message: 'Filme removido da lista com sucesso!',
        style: 'alert-success',
        isVisible: true,
      });
    } else if (!isRemoved) {
      showToast({
        message: 'Erro ao remover o filme da lista.',
        style: 'alert-error',
        isVisible: true,
      });
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
    </>
  );
}

export default RemoveMovieFromFavorite
