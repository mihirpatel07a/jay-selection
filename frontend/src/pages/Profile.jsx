import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signOutStart,
  signOutFailure,
  signOutSuccess,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";


export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: currentUser.data.username,
    email: currentUser.data.email,
    password: currentUser.data.password,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch(`/api/user/update/${currentUser.data._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        console.log(data.message); // Log error message
      } else {
        console.log("Updated Successfully");


        console.log(data.data.avatar)
        setFormData(data.data)
        dispatch(updateUserSuccess(data));

        alert("updated successfully")


        // Log success message
        navigate("/home"); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async()=>{
      
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser.data._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));

      navigate("/signin");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleSignout = async()=>{
      try{
        dispatch(signOutStart());

        const res = await fetch('/api/auth/signout' , {
          method : "GET"
        })

        const data = res.json();

        if (data.success === false) {
          dispatch(signOutFailure(data.message));
          return;
        }

        dispatch(signOutSuccess());
    
        navigate("/signin");

      }
      catch(error)
      {
        dispatch(signOutFailure(error.message))
      }
  }

  return (
    <>
      <div className="p-3 flex-col mx-auto max-w-lg align-items-center   ">
        <h1 className="text-center text-4xl font-semibold"> Profile </h1>

        <img
          className="rounded-full mt-4 h-[160px] w-[160px] object-cover mx-auto "
          src={currentUser.data.avatar}
          alt="User Avatar"
        ></img>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label className="mt-4 font-semibold">Username</label>
          <input
            placeholder="Username"
            className="border p-3 rounded-lg hover:bg-sky-100"
            type="text"
            name="username"
            id="username"
            onChange={handleChange}
            defaultValue={formData.username}
            // value={formData.username}
          ></input>

          <label className="mt-2 font-semibold">Email</label>
          <input
            placeholder="Email"
            className="border p-3 rounded-lg hover:bg-sky-100"
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            defaultValue={formData.email}
            // value={formData.email}
          ></input>

          <label className="mt-2 font-semibold">Password</label>
          <input
            placeholder="Password"
            className="border p-3 rounded-lg hover:bg-sky-100"
            type="password"
            name="password"
            id="password"
            // value={formData.password}
            defaultValue={formData.password}

            onChange={handleChange}
            required
          ></input>

          <button className="bg-slate-700 text-white hover:opacity-95 rounded-lg p-2 text-xl mt-4">
            Update
          </button>
        </form>

        <div className="flex justify-between"> 
          <button onClick={handleSignout} className="bg-slate-700 p-3 rounded-lg mt-4 text-white">Sign Out</button>
          <button onClick={handleDelete} className="bg-slate-700 p-3 rounded-lg mt-4 text-white">Delete Account</button>
        </div>
      </div>
    </>
  );
}
