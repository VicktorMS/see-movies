'use client';
import React from 'react';
import { useToast } from '@/app/ui/toast-context';

function Layout({ children }) {
  const { toast } = useToast();

  return (
    <>
      {children}
      {toast.isVisible && (
        <div className={`toast toast-center bottom-20 z-[99] ${toast.style}`}>
          <div className={`alert ${toast.style}`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </>
  );
}

export default Layout;
