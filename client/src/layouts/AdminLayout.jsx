import {React, useEffect} from "react";
import Sidebar from "../components/managment/Sidebar/Sidebar"
import Favicon from "react-favicon"
import { isAuthenticated } from "../components/auth";
import { useNavigate } from "react-router-dom";
export default function AdminLayout({ children }) {
  
  const navigate = useNavigate();

  useEffect(() => {
      if(!isAuthenticated(navigate)){
          navigate('/admin/login'); // Перенаправляем пользователя на страницу аутентификации
      }
  }, [navigate]);
  
  return (
    
    <div className="h-dvh flex">
      <Favicon url="../../public/favicon.ico"></Favicon>
        <Sidebar />
        <div className="h-dvh absolute top-0 left-0 right-0 pl-[100px] pr-[20px] py-[20px] w-full bg-stone-100 overflow-y-auto">
        {children}
        </div>
  </div>
  );
}