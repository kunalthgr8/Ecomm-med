import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import {
  Addproduct,
  Login,
  Signup,
  Contact,
  Offers,
  Home,
  Products,
  Cart,
  User,
  Steper,
  ChangePassword,
  AuthLayout,
  Product,
  GetAdminProducts,
  AdminProduct,
  AdminDashboard,
  OrderHistory,
  AdminCustomers,
  NotFoundd,
} from "./components/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false} isAdmin={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false} isAdmin={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/offers",
        element: <Offers />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/stepper",
        element: (
          <AuthLayout authentication={true} isAdmin={false}>
            <Steper />
          </AuthLayout>
        ),
      },
      {
        path: "/orderHistory",
        element: (
          <AuthLayout authentication={true} isAdmin={false}>
            <OrderHistory />
          </AuthLayout>
        ),
      },
      {
        path: "/getAdminProducts",
        element: (
          <AuthLayout authentication={true} isAdmin={true}>
            <GetAdminProducts />
          </AuthLayout>
        ),
      },
      {
        path: "/changePassword",
        element: (
          <AuthLayout authentication={true} isAdmin={false}>
            <ChangePassword />
          </AuthLayout>
        ),
      },
      // {
      //   path: "/adminDashboard",
      //   element: (
      //     <AuthLayout authentication={true} isAdmin={true}>
      //       <AdminDashboard />
      //     </AuthLayout>
      //   ),
      // },
      {
        path: "/adminproduct/:id",
        element: (
          <AuthLayout authentication={true} isAdmin={true}>
            <AdminProduct />
          </AuthLayout>
        ),
      },
      {
        path: "/addproduct",
        element: (
          <AuthLayout authentication={true} isAdmin={true}>
            <Addproduct />
          </AuthLayout>
        ),
      },
      {
        path: "/customers",
        element: (
          <AuthLayout authentication={true} isAdmin={true}>
            <AdminCustomers />
          </AuthLayout>
        ),
      },
      {
        path: "*",
        element: <NotFoundd />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
