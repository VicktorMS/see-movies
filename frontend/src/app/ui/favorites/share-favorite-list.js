'use client';
import React from 'react';
import { useToast } from '@/app/ui/toast-context';

function ShareFavoriteList({ listId, Icon }) {
  const { showToast } = useToast();

  const handleShare = () => {
    const currentUrl = window.location.href;
    const shareUrl = `${currentUrl}/${listId}/details`;

    navigator.clipboard.writeText(shareUrl).then(() => {
      showToast({
        message: 'Link copiado para a área de transferência!',
        style: 'alert-success',
        isVisible: true,
      });
    }).catch((err) => {
      showToast({
        message: 'Erro ao copiar o link.',
        style: 'alert-error',
        isVisible: true,
      });
      console.error('Erro ao copiar o link: ', err);
    });
  };

  return (
    <div onClick={handleShare} className="cursor-pointer flex items-center">
      <Icon />
      <span className="ml-2">Compartilhar</span>
    </div>
  );
}

export default ShareFavoriteList;
