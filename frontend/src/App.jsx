import React from 'react'
import {BrowserRouter ,Routes , Route}  from 'react-router-dom'
import Home from './pages/home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Nav from  './pages/nav'
import Profile from './pages/Profile'
import CreateItem from './Adminpages/CreateItem'
import Items from './Adminpages/Items'
import UpdateItem from './Adminpages/UpdateItem'
import Users from './Adminpages/Users'
import PagenotFound from './pages/PagenotFound'
import Ahome from './Adminpages/Ahome'
import Products from './pages/Products'
import AllProducts from './pages/Allproducts'
import Pdetails from './pages/Pdetails'
import Cart from './pages/Cart'
import Checkout from './pages/CheckoutPage'
import Order from './pages/Order'

export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Nav/>
      <Routes>

        <Route path="/*" element={<PagenotFound/>} ></Route>
        <Route path="/home" element={<Home/>} ></Route>
        <Route path="/signin" element={<Signin/>} ></Route>
        <Route path="/signup" element={<Signup/>} ></Route>
        <Route path="/profile" element={<Profile/>} ></Route>
        <Route path="/products" element={<AllProducts/>} ></Route>
        <Route path="/product/:id" element={<Pdetails/>} ></Route>
        <Route path="/cart" element={<Cart/>} ></Route>
        <Route path="/checkout" element={<Checkout/>} ></Route>
        <Route path="/order" element={<Order/>} ></Route>



        <Route path="/admin/createitem" element={<CreateItem/>} ></Route>
        <Route path="/admin/items" element={<Items/>} ></Route>
        <Route path="/admin/updateitem/:id" element={<UpdateItem/>} ></Route>
        <Route path="/admin/users" element={<Users/>} ></Route>
        <Route path="/admin/home" element={<Ahome/>} ></Route>

        
      </Routes>
      </BrowserRouter>
    </div>
  )
}
