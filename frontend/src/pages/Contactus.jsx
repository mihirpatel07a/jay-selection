import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

export default function Contactus() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
  
    name: "",
    email: "",
    message: "",
  });
  const navigate = useNavigate(); 

  const handlechange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      const res = await fetch('/api/user/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
     // Log the response to the console
  
      if (data.success === false) {
        console.log(data.message);
      }
      alert("Send Successfuly")
      navigate('/home');
      
    } catch (error) {
      console.log(error);
    }
  };
  

 
  return (
    <>
      <h1 className="text-5xl font-semibold text-center p-5">Contact us</h1>
      <div className=" p-3 max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 border p-3 rounded-lg">
          <label className="font-semibold text-lg">name</label>
          <input
            className="rounded-sm p-2"
            id="name"
            type="text"
            placeholder="Your name"
            onChange={handlechange}
          ></input>
          <label className="font-semibold text-lg">email: </label>
          <input
            className="rounded-sm p-2"
            id="email"
            type="email"
            placeholder="Your email"
            onChange={handlechange}
          ></input>
          <label className="font-semibold text-lg">message:</label>
          <textarea
            placeholder="Enter Your Feedback Here..."
            name="message"
            id="message"
            cols="53"
            rows="3"
            className="border rounded-lg p-3"
            onChange={handlechange}
          ></textarea>

          <button className="bg-slate-700 text-lg hover:opacity-95 rounded-lg p-3 text-white">
            Submit
          </button>
        </form>
      </div>
      <Footer/>
    </>
  );
}
