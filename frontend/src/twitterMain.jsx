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
import { UserProvider } from "./context/userContext";
import UserProfile from "./UserProfilePage";
import { CreatePostPage } from "./CreatePostPage";

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
  {
    path: "/user/:username",
    element: <UserProfile />,
  },
  {
    path: "/createpost",
    element: <CreatePostPage isCreatePost={true} />,
  },
  {
    path: "/updatepost/:postId",
    element: <CreatePostPage isCreatePost={false} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
