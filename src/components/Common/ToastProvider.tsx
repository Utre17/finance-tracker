import React from 'react';
import { Toaster } from 'react-hot-toast';

const ToastProvider: React.FC = () => {
  return (
    <Toaster
      position="top-right"
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Default options for all toasts
        duration: 4000,
        style: {
          background: 'var(--toast-bg)',
          color: 'var(--toast-color)',
          border: '1px solid var(--toast-border)',
          borderRadius: '8px',
          fontSize: '14px',
          maxWidth: '400px',
          padding: '12px 16px',
        },
        // Success toast styling
        success: {
          duration: 3000,
          style: {
            background: '#10b981',
            color: '#ffffff',
            border: '1px solid #059669',
          },
          iconTheme: {
            primary: '#ffffff',
            secondary: '#10b981',
          },
        },
        // Error toast styling
        error: {
          duration: 5000,
          style: {
            background: '#ef4444',
            color: '#ffffff',
            border: '1px solid #dc2626',
          },
          iconTheme: {
            primary: '#ffffff',
            secondary: '#ef4444',
          },
        },
        // Loading toast styling
        loading: {
          style: {
            background: '#3b82f6',
            color: '#ffffff',
            border: '1px solid #2563eb',
          },
          iconTheme: {
            primary: '#ffffff',
            secondary: '#3b82f6',
          },
        },
      }}
    />
  );
};

export default ToastProvider; 