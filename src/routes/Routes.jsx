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
import ManageUsers from "../pages/DashBoard/ManageUsers";
import AdminProfile from "../pages/DashBoard/AdminProfile";
import PrivateRoute from "./PrivateRoute";
import CheckoutPage from "../pages/PaymentSection/CheckoutPage";
import MyProfile from "../pages/DashBoard/MyProfile";
import PaymentHistory from "../pages/PaymentSection/PaymentHistory";
import MealsPage from "../pages/MealSection/MealsPage";
import MyReviews from "../pages/DashBoard/MyReviews";
import RequestedMeals from "../pages/DashBoard/RequestedMeals";
import AllReviews from "../pages/DashBoard/AllReviews";



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
      },

      {

        path: 'allmeal',
        element: <MealsPage></MealsPage>

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
    path: "/checkout/:packageId",
    element: <PrivateRoute><CheckoutPage></CheckoutPage></PrivateRoute>

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
      {
        path: 'manegUsers',
        element: <ManageUsers></ManageUsers>
      },
      {
        path: 'adminProfile',
        element: <AdminProfile></AdminProfile>
      },
      {
        path: 'myProfile',
        element: <MyProfile></MyProfile>
      },
      {
        path: "payment-history",
        element: <PrivateRoute><PaymentHistory /></PrivateRoute>
      },
      {
        path: 'my-reviews',
        element: <MyReviews></MyReviews>
      },
      {
        path: 'requested-meals',
        element: <RequestedMeals></RequestedMeals>
      },
      {
        path: 'all-reviews',
        element: <AllReviews></AllReviews>
      }


    ]
  },


]);