'use client';
import { useState, useEffect } from 'react';

export default function BackToTopButton() {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!showButton) {
    return null;
  }

  return (
    <button
    onClick={scrollToTop}
    className={`fixed bottom-20 right-4 md:right-10 md:bottom-10 btn btn-secondary md:btn-lg rounded-full z-[99] transition-transform transform ${showButton ? 'translate-x-0' : 'translate-x-full'} ease-in-out duration-300`}
  >
    Voltar para o topo
  </button>
  );
}
