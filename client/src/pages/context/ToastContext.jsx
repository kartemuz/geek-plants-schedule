import React, { createContext, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  return (
    <ToastContext.Provider value={toast}>
      <ToastContainer />
      {children}
    </ToastContext.Provider>
  );
};
