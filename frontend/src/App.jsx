import React from 'react'
import {BrowserRouter ,Routes , Route}  from 'react-router-dom'
import Home from './pages/home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'


export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home/>} ></Route>
        <Route path="/signin" element={<Signin/>} ></Route>
        <Route path="/signup" element={<Signup/>} ></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}
