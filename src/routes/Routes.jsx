import {
  createBrowserRouter,
} from "react-router"
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import DashBoardLayout from "../layout/DashBoardLayout";
import AddMeal from "../pages/MealSection/AddMeal";
import AllMeals from "../pages/MealSection/AllMeals";
import MealDetails from "../pages/MealSection/MealDetails";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'meal/:id',
        element: <MealDetails />
      }


    ]


  },


  {
    path: 'login',
    Component: Login
  },
  {
    path: 'register',
    Component: Register
  },


  {

    path: 'dashboard',
    element: <DashBoardLayout></DashBoardLayout>,
    children: [
      {
        path: 'addMeal',
        element: <AddMeal></AddMeal>
      },
      {
        path: 'allMeals',
        element: <AllMeals></AllMeals>
      },

    ]
  },


]);