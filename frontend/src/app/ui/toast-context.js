'use client';
import React, { createContext, useState, useContext } from 'react';

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    style: '',
  });

  const showToast = ({ message, style = '', isVisible = true }) => {
    setToast({ isVisible, message, style });
    if (isVisible) {
      setTimeout(() => {
        setToast({ isVisible: false, message: '', style: '' });
      }, 3000);
    }
  };

  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {children}
    </ToastContext.Provider>
  );
}
