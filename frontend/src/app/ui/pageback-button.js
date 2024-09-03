'use client'
import { useRouter } from 'next/navigation';
import { CaretLeft } from '@phosphor-icons/react';

export default function PageBackButton() {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} aria-label="Voltar">
      <CaretLeft size={32} weight="bold" />
    </button>
  );
}
