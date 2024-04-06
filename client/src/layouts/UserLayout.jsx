import React from "react";
import Sidebar from "../components/managment/Sidebar"

export default function UserLayout({ children }) {
  return (
    <div className="h-full flex">
        <Sidebar />
        <div className="h-full absolute top-0 left-0 right-0 pl-[80px] w-full bg-stone-100">
        {children}
        </div>
  </div>
  );
}