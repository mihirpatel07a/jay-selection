import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Nav from "./pages/nav";
import Profile from "./pages/Profile";
import CreateItem from "./Adminpages/CreateItem";
import Items from "./Adminpages/Items";
import UpdateItem from "./Adminpages/UpdateItem";
import Users from "./Adminpages/Users";
import PagenotFound from "./pages/PagenotFound";
import Ahome from "./Adminpages/Ahome";
import Products from "./pages/Products";
import AllProducts from "./pages/Allproducts";
import Pdetails from "./pages/Pdetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/CheckoutPage";
import Order from "./pages/Order";
import AOrder from "./Adminpages/AOrder";
import Privateprofile from "./pages/Privateprofile";
import { useSelector } from "react-redux";

export default function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          {currentUser && currentUser.email === "admin1711@gmail.com" ? (
            <>
              <Route path="/home" element={<Ahome />}></Route>
              <Route path="/admin/createitem" element={<CreateItem />}></Route>
              <Route path="/admin/items" element={<Items />}></Route>
              <Route
                path="/admin/updateitem/:id"
                element={<UpdateItem />}
              ></Route>
              <Route path="/admin/users" element={<Users />}></Route>

              <Route path="/admin/order" element={<AOrder />}></Route>
              <Route path="/*" element={<PagenotFound />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
            </>
          ) : (
            <>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/*" element={<PagenotFound />}></Route>

              <Route path="/signin" element={<Signin />}></Route>
              <Route path="/signup" element={<Signup />}></Route>

              <Route path="/products" element={<AllProducts />}></Route>
              <Route path="/product/:id" element={<Pdetails />}></Route>

              <Route element={<Privateprofile />}>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="/checkout" element={<Checkout />}></Route>
                <Route path="/order" element={<Order />}></Route>
              </Route>
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
