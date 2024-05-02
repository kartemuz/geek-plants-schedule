import React from "react";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import ErrorPage from "./pages/Error"
import HomePage from "./pages/Home"
import SchedulePage from "./pages/Schedules"
import GroupsPage from "./pages/Groups"
import FlowsPage from "./pages/Flows"
import DisciplinesPage from "./pages/Disciplines"
import DirectionsPage from "./pages/Directions"
import TeachersPage from "./pages/Teachers"
import UsersPage from "./pages/Users"
import OrganizationPage from "./pages/Organization"
import TestPage from "./pages/Test";
import LoginPage from "./pages/Login";

import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App";
import "./index.css";

import { ToastProvider } from "./pages/context/ToastContext";

const router = createBrowserRouter([
  {
    path: "*",
    element: 
      <ErrorPage />
  },
  {
    path: "/",
    element: <UserLayout>123</UserLayout>,
  },
  {
    path: "/admin/",
    element: <AdminLayout>
      <HomePage />
      </AdminLayout>,
  },
  {
    path: "/admin/login",
    element: <LoginPage/>,
  },
  {
    path: "/test/",
    element: <AdminLayout>
      <TestPage />
      </AdminLayout>,
  },
  {
    path: "/admin/schedules/",
    element: <AdminLayout>
      <SchedulePage />
      </AdminLayout>,
  },
  {
    path: "/admin/groups/",
    element: <AdminLayout>
      <GroupsPage />
      </AdminLayout>,
  },
  {
    path: "/admin/flows/",
    element: <AdminLayout>
      <FlowsPage />
      </AdminLayout>,
  },
  {
    path: "/admin/disciplines/",
    element: <AdminLayout>
      <DisciplinesPage />
      </AdminLayout>,
  },
  {
    path: "/admin/directions/",
    element: <AdminLayout>
      <DirectionsPage />
      </AdminLayout>,
  },
  {
    path: "/admin/teachers/",
    element: <AdminLayout>
      <TeachersPage />
      </AdminLayout>,
  },
  {
    path: "/admin/users/",
    element: <AdminLayout>
      <UsersPage />
      </AdminLayout>,
  },
  {
    path: "/admin/organization/",
    element: <AdminLayout>
      <OrganizationPage />
      </AdminLayout>,
  }
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
      <NextUIProvider className="h-full">
      <ToastProvider>
        <RouterProvider router={router} />
        </ToastProvider>
      </NextUIProvider>

  </React.StrictMode>
);

