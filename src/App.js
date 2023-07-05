import React, { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Checkout from "./pages/Checkout";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import CartPage from "./pages/CartPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/protected";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import PageNotFound from "./pages/404";
import OrderSuccess from './pages/OrderSuccess'
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from './pages/UserProfilePage'
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import Logout from "./features/auth/components/Logout";
import { ForgetPassword } from "./features/auth/components/ForgetPassword";
import ProtectedAdmin from "./features/auth/components/protectedAdmin";
import AdminHomePage from'./pages/AdminHomePage'
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import AdminAddProductForm from "./features/admin/components/AdminAddProductForm";
import AdminAddProductFormPage from "./pages/AdminAddProductPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout></Checkout>
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage></ProductDetailPage>
      </Protected>
    ),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccess></OrderSuccess>,
  },
  {
    path: "/myorders",
    element: <UserOrdersPage></UserOrdersPage>,
  },
  {
    path: "/profile",
    element: <UserProfilePage></UserProfilePage>,
  },
  {
    path: "/logout",
    element: <Logout></Logout>,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword></ForgetPassword>,
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHomePage></AdminHomePage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-detail",
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage></AdminProductDetailPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage></AdminOrdersPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/add-product",
    element: (
      <ProtectedAdmin>
        <AdminAddProductFormPage></AdminAddProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/edit-product/:id",
    element: (
      <ProtectedAdmin>
        <AdminAddProductFormPage></AdminAddProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);

function App() {
  const dispatch= useDispatch();
  const user= useSelector(selectLoggedInUser);

  useEffect(()=>{
    if(user){
    dispatch(fetchItemsByUserIdAsync(user.id))
    dispatch(fetchLoggedInUserAsync(user.id))

    }
  },[dispatch,user])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
