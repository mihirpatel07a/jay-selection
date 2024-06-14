import React, { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import Google from './Google.jsx'
import {gapi} from 'gapi-script'
import { signInStart , signInFailure , signInSuccess } from '../redux/user/userSlice.js';
import { useDispatch, useSelector  } from 'react-redux';

export default function Signin() {

  const client_id = "575460440395-adutdk1qctesgfj7h4c9eca0t41vb8m5.apps.googleusercontent.com";

  const [formData , setFormData] = useState({});
  
  const { loading, error } = useSelector((state) => state.user);


  const navigate = useNavigate();
  const dispatch = useDispatch();




  useEffect(()=>{
    function start() {
      gapi.client.init({
        clientId : client_id,
        scope : ""
      })
    };

    gapi.load('client:auth2' , start);
  });

  

  const handleChange = (e)=>{
      setFormData({
        ...formData,
        [e.target.id] : e.target.value
      })
  }

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      dispatch(signInStart());
  
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      if (data.success === false) {
        dispatch(signInFailure(data.message)); // Dispatch signInFailure action
        return;
      } else {
        dispatch(signInSuccess(data)); // Dispatch signInSuccess action
        navigate('/home');
      }
    } catch (error) {
      // Handle error
      setLoading(false);
      setError(error.message);
    }
  };
  

  return (
 
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign in</h2>
            <p className="mt-2 text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <a
                href="/signup"
                title=""
                className="font-semibold text-black transition-all duration-200 hover:underline"
              >
                Create a free account
              </a>
            </p>
            <form onSubmit={handleSubmit} method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    {' '}
                    Email address{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      onChange={handleChange}
                      id='email'
                      required
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="" className="text-base font-medium text-gray-900">
                      {' '}
                      Password{' '}
                    </label>
                    <a
                      href="#"
                      title=""
                      className="text-sm font-semibold text-black hover:underline"
                    >
                      {' '}
                      Forgot password?{' '}
                    </a>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      onChange={handleChange}
                      id='password'
                      required
                    ></input>
                  </div>
                </div>
                <div>
                  <button
                    disabled = {loading}
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    {loading ? "loading..." : "Signin"}
                     <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-3 space-y-3">
              <Google/>
            {error && <p className='text-red-500 mt-5'>{error}</p> }
            </div>
          </div>
        </div>
        <div className="h-full w-full">
          <img
            className="mx-auto h-[500px] w-[500px] mt-10 rounded-md object-cover"
            src="https://images.unsplash.com/photo-1630673245362-f69d2b93880e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            alt=""
          />
        </div>
      </div>
    </section>
  )
}

