import React from "react";
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

import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App";
import "./index.css";

const router = createBrowserRouter([
  
  {
    path: "*",
    element: <UserLayout>
      <ErrorPage />
      </UserLayout>,
  },
  {
    path: "/",
    element: <UserLayout>
      <HomePage />
      </UserLayout>,
  },
  {
    path: "/schedules/",
    element: <UserLayout>
      <SchedulePage />
      </UserLayout>,
  },
  {
    path: "/groups/",
    element: <UserLayout>
      <GroupsPage />
      </UserLayout>,
  },
  {
    path: "/flows/",
    element: <UserLayout>
      <FlowsPage />
      </UserLayout>,
  },
  {
    path: "/disciplines/",
    element: <UserLayout>
      <DisciplinesPage />
      </UserLayout>,
  },
  {
    path: "/directions/",
    element: <UserLayout>
      <DirectionsPage />
      </UserLayout>,
  },
  {
    path: "/teachers/",
    element: <UserLayout>
      <TeachersPage />
      </UserLayout>,
  },
  {
    path: "/users/",
    element: <UserLayout>
      <UsersPage />
      </UserLayout>,
  },
  {
    path: "/organization/",
    element: <UserLayout>
      <OrganizationPage />
      </UserLayout>,
  }
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider className="h-full">
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>
);