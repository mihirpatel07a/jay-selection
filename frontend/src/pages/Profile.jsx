import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { signOutStart , signOutFailure , signOutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function Profile() {

  const [error , setError] = useState(null);


  const navigate = useNavigate();
  const dispatch= useDispatch();

  const handleSignOut = async ()=> {

    const res = await fetch('/api/auth/signout' , {
      method : "GET"
    });

    const data = await res.json();

    if(data.success === false)
      {
          setError(data.message);
          return;
      }

      navigate('/signin');

  }


  return (
    <div>
      <h1> profile </h1>

      <button onClick={handleSignOut} 
      className='text-white text-sm font-medium bg-gray-800 rounded-lg px-4 py-2'>
        Signout
      </button>

      {error && <p className='text-red-700 mt-5'>{error}</p>}
    </div>
  )
}
