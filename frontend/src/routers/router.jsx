import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import App from "../App";
import { Home } from "../components/home/home";
import { Shop } from "../components/shop/Shop";
import { About } from "../components/about/About";
import { Blog } from "../components/blog/Blog";
import { SingleBook } from "../components/common/SingleBook";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { UploadBook } from "../components/dashboard/UploadBook";
import { Dashboard } from "../components/dashboard/Dashboard";
import { ManageBooks } from "../components/dashboard/ManageBooks";
import { EditBooks } from "../components/dashboard/EditBooks";
import { SignUp } from "../components/auth/SignUp";
import { Login } from "../components/auth/Login";
import { PrivateRoute } from "../privateRoute/PrivateRoute";
import { LogOut } from "../components/auth/LogOut";

const BASE_URL = "http://localhost:4000"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
        {
            path: '/',
            element: <Home/>
        },
        {
            path: '/shop',
            element: <Shop/>
        },
        {
            path: '/about',
            element: <About/>
        },
        {
            path: '/blog',
            element: <Blog/>
        },
        {
          path: '/book/:id',
          element: <SingleBook/>,
          loader: ({params}) => fetch(`${BASE_URL}/book/${params.id}`),
        }
    ]
  },
  {
    path: '/admin/dashboard',
    element: <DashboardLayout/>,
    children: [
      {
        path: '/admin/dashboard/upload',
        element: <PrivateRoute>
          <UploadBook/>
        </PrivateRoute>
      },
      {
        path: '/admin/dashboard/manage',
        element: <ManageBooks/>
      },
      {
        path: '/admin/dashboard/edit-books/:id',
        element: <EditBooks/>,
        loader: ({params}) => fetch(`${BASE_URL}/book/${params.id}`),
      }
    ]
  },
  {
    path: '/sign-up',
    element: <SignUp/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/log-out',
    element: <LogOut/>
  }
]);

export default router;