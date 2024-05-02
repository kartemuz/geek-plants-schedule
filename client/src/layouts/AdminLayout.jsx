import React from "react";
import Sidebar from "../components/managment/Sidebar/Sidebar"
import Favicon from "react-favicon"

export default function UserLayout({ children }) {
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