import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../components/login/Login.jsx";
import Signup from "../components/signup/Signup.jsx";
import DashBoardContainer from "../components/DashBoardContainer/DashBoardContainer.js";
import ArchiveContainer from "../components/ArchiveContainer/ArchiveContainer.js";
import TrashContainer from "../components/TrashContainer/TrashContainer.js";
import NotesContainer from "../components/NotesContainer/NotesContainer.js";
import ProtectedRoute from "./ProtectedRoute"; // Ensure ProtectedRoute is used
import userAuth from "./UserAuth.js";
import { Navigate } from "react-router-dom";
import ReminderContainer from "../components/Reminders/Reminders.jsx";
export default function RoutingModule() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: userAuth() ? <Navigate to="/dashboard/notes" replace /> : <Login />,

    },
    {
      path: "/signup",
      element: userAuth() ? <Navigate to="/dashboard/notes" replace /> : <Signup />,

    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <DashBoardContainer />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "notes",
          element: <NotesContainer />,
        },
        {
          path: "reminder",
          element: <ReminderContainer/>,
        },
        {
          path: "archive",
          element: <ArchiveContainer />,                          
        },
        {
          path: "trash",
          element: <TrashContainer />,
        },
      ],
    },
  ]);

  return <RouterProvider router={route} />;
}
