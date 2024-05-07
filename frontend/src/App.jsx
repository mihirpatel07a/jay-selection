import React from 'react'
import {BrowserRouter ,Routes , Route}  from 'react-router-dom'
import Home from './pages/home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Nav from  './pages/nav'
import Profile from './pages/Profile'

export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Nav/>
      <Routes>

        <Route path="/home" element={<Home/>} ></Route>
        <Route path="/signin" element={<Signin/>} ></Route>
        <Route path="/signup" element={<Signup/>} ></Route>
        <Route path="/profile" element={<Profile/>} ></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}
