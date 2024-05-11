import React, { useState } from "react";
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from "react-router-dom";

export default function Google() {

  const navigate = useNavigate();
  const client_id = "575460440395-adutdk1qctesgfj7h4c9eca0t41vb8m5.apps.googleusercontent.com";

  const [error, setError] = useState(null);

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
      const response = await fetch('/api/auth/google', {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify(formdata)
      });

      const data = await response.json();

      if (data.success === false) {
        setError(data.message);
      } else {
        navigate('/home');
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      setError("An error occurred during sign-in");
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
