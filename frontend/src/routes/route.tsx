import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Register from "../pages/Register";
import SignIn from "../pages/SignIn";
import AddHotel from "../pages/AddHotel";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/add-hotel",
        element: <AddHotel />,
      },
    ],
  },
]);
