import React from "react";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import { useRecoilValue } from "recoil";
import { isUserLogin } from "../states/atoms/userLogin";

function Router() {
  const isLogin = useRecoilValue(isUserLogin);

  const Layout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  };
  const BrowserRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: isLogin ? <Home /> : <Navigate to="/login" /> },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);

  return <RouterProvider router={BrowserRoutes} />;
}

export default Router;
