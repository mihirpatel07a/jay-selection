import React, { useState } from 'react';
import img from '../assets/js.jpg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Nav() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  


  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div>
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-4 dark:bg-slate-800">
        <nav className="max-w-[85rem]  w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
          <div className="flex items-center justify-between">
            <a className="inline-flex items-center w-[200px] gap-x-2 text-xl font-semibold dark:text-white" href="#">
              <img className="w-10 h-auto mr-2" src={img} alt="Logo" />
              Jay Selection
            </a>
            <div className="sm:hidden">
              <button type="button" className="p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-white dark:hover:bg-white/10" onClick={toggleNav} aria-label="Toggle navigation">
                {isNavOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                ) : (


                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className={`overflow-hidden transition-all duration-300 basis-full grow sm:block ${isNavOpen ? 'block' : 'hidden'}`}>
            <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">


              {currentUser && currentUser.email === "admin1711@gmail.com" ? (
<>


<a className="font-medium text-blue-500" href="/home" aria-current="page">Home</a>
<a className="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500" href="/admin/items">Products</a>
<a className="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500" href="/admin/createitem">CreateItem</a>
<a className="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500" href="/admin/order">Orders</a>
</>

              ) : (

                <>
               
                <a className="font-medium text-blue-500" href="/home" aria-current="page">Home</a>
                <a className="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500" href="/products">Products</a>
                <a className="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500" href="/cart">Cart</a>
                <a className="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500" href="/order">Orders</a>
                </>
              )}
           
              {currentUser ?
                (
                  <Link to={'/profile'}>
                    <img className='rounded-full w-10 h-10' src={currentUser.avatar} ></img>   </Link> ) :

                (
                   <a className="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500" href="/signin">Sign-in</a>

                )

              }



            </div>

          </div>
        </nav>
      </header>
    </div>
  );
}
