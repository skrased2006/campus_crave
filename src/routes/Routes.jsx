import {
  createBrowserRouter,
} from "react-router"
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home
      },


    ]


  },


  {
    path: 'login',
    Component: Login
  },
  {
    path: 'register',
    Component: Register
  }


]);