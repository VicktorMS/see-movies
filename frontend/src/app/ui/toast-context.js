'use client';
import React, { createContext, useState, useContext } from 'react';

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [isToastVisible, setIsToastVisible] = useState(false);

  const showToast = () => {
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 3000); 
  };

  return (
    <ToastContext.Provider value={{ isToastVisible, showToast }}>
      {children}
    </ToastContext.Provider>
  );
}
