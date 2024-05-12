import React, { useState } from "react";
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from "react-router-dom";
import { signInStart , signInSuccess , signInFailure } from "../redux/user/userSlice";

import { useDispatch, useSelector } from "react-redux";

export default function Google() {

  const navigate = useNavigate();
  const client_id = "575460440395-adutdk1qctesgfj7h4c9eca0t41vb8m5.apps.googleusercontent.com";

  const {error} = useSelector((state) => state.user);
  const dispatch = useDispatch();


  const onSuccess = async (res) => {
    console.log("Login success! Current User:");

    const name = res.profileObj.name;
    const email = res.profileObj.email;
    const url = res.profileObj.imageUrl;

    const formdata = {
      username: name,
      email: email,
      avatar: url,
    };

    try {

      dispatch(signInStart());
      
      const response = await fetch('/api/auth/google', {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify(formdata)
      });

      const data = await response.json();

      if (data.success === false) {
        
        dispatch(signInFailure(data.message));
      } else {

        dispatch(signInSuccess(data));
        navigate('/home');
      }
    } catch (error) {
     
       dispatch(signInFailure(error.message));
    }
  }

  const onFailure = (res) => {
    console.log("Login failed!", res);
    setError("Google sign-in failed");
  }

  return (
    <div>
      <GoogleLogin
        clientId={client_id}
        buttonText="Sign in with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
      />
      {error && <p className="text-red-700 mt-5">{error}</p>}
    </div>
  );
}
