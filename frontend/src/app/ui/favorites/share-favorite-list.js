'use client';
import React from 'react';
import { useToast } from '@/app/ui/toast-context';

function ShareFavoriteList({ listId, Icon }) {
  const { showToast } = useToast(); 

  const handleShare = () => {
    const currentUrl = window.location.href;
    const shareUrl = `${currentUrl}/${listId}/details`;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
      showToast();
    }).catch((err) => {
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
