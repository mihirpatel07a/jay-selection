import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signOutStart,
  signOutFailure,
  signOutSuccess,
  deleteUserFailure, 
  deleteUserSuccess , 
  deleteUserStart
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Profile() {
  const {error} = useSelector((state)=> state.user);

  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    const res = await fetch("/api/auth/signout", {
      method: "GET",
    });

    const data = await res.json();

    if (data.success === false) {
      setError(data.message);
      return;
    }

    navigate("/signin");
  };

 
  

  const handleSubmit = () => {};

  const handleDeleteUser = async ()=> {

    try
    {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser.data._id}` , {
        method : "DELETE"
      })

      const data = res.json();

      if(data.success === false)
        {
          dispatch(deleteUserFailure(data.message));
          return ;
        }

        dispatch(deleteUserSuccess(data));

        navigate('/signin');

    }
    catch(error){
      dispatch(deleteUserFailure(error.message));

    }
  }

  return (
    <div className="p-3 flex-col mx-auto max-w-lg ">
      <h1 className="text-center text-4xl font-semibold"> Profile </h1>

      <img
        className="rounded-full mt-4 h-[160px] w-[160px] object-cover self-center "
        src={currentUser.data.avatar}
        alt="mihir"
      ></img>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label className="mt-4 font-semibold">Username</label>
        <input
          placeholder="username"
          className="border p-3 rounded-lg hover:bg-sky-100"
          type="text"
          name="username"
          id="username"
          defaultValue={currentUser.data.username}
        ></input>

        <label className="mt-2 font-semibold">Email</label>
        <input
          placeholder="Email"
          className="border p-3 rounded-lg hover:bg-sky-100"
          type="email"
          name="email"
          id="email"
          defaultValue={currentUser.data.email}
        ></input>

        <label className="mt-2 font-semibold">Password</label>
        <input
          placeholder="password"
          className="border p-3 rounded-lg hover:bg-sky-100"
          type="text"
          name="password"
          id="password"
          defaultValue={currentUser.data.password}
        ></input>

        <button className="bg-slate-700 text-white hover:opacity-95 rounded-lg p-2 text-xl mt-4" >Update</button>
      </form>

      <div className="flex  justify-between">
      <button
        onClick={handleSignOut}
        className="text-white text-md bg-slate-700  font-medium  rounded-lg px-4 mt-4"
      >
        Signout
      </button>

      <button
        onClick={handleDeleteUser}
        className="text-white text-md bg-slate-700 p-2 font-medium  rounded-lg px-4 mt-4"
      >
        deleteUser
      </button>
      </div>

     

      {error && <p className="text-red-700 mt-5">{error}</p>}
    </div>
  );

}
