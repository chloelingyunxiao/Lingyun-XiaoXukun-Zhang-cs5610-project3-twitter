import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import LoginPage from "./LoginPage";
import TalkTownPage from "./TalkTownPage";
import RegisterPage from "./RegisterPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/talktown" />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/talktown",
    element: <TalkTownPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
