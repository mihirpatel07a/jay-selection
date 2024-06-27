import React from "react";
import mihirimage2 from "../assets/mihir1.jpg";
import pappaimage from "../assets/12.jpg";
import uncleimage from "../assets/uncle.jpg";
import Map from "../pages/Map";
import Footer from "./Footer";

// import Map from './Map'; // Ensure the correct path to the Map component

export default function Aboutus() {
  const address = "rajkot"; // Replace with your actual address or city

  return (
    <>
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 md:pr-8">
          <div className=" mb-4 flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-slate-800">About</h1>
            <h1 className="text-2xl font-semibold">
              <span className="text-slate-500">JAY</span>
              <span className="text-slate-700"> SELECTION</span>
            </h1>
          </div>
          <p className="text-gray-700 mb-3">
            Welcome to JAY SELECTION, where fashion meets quality and
            affordability! Established in 1992, our mission is to provide
            stylish, high-quality clothing that caters to every taste and
            occasion. We believe that everyone deserves to look and feel their
            best, and we're here to make that possible with our diverse range of
            apparel. 
          </p>
          <p className="text-black font-semibold text-2xl">Our Location : </p>
          <div className="  text-gray-700">
          <p>Opp charmshilp footwear, Jay selection</p>
    
          <p className="mb-1">New Cutlery bazzar Upleta-360490</p>
          <a className="bg-slate-700 rounded-lg p-1  text-white" href="https://www.google.co.in/maps/dir/21.75132,70.2711536/Jay+selection+Upleta/@21.7485213,70.2687197,15.81z/data=!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3957f319967a4a79:0x2c67e3d946b5090d!2m2!1d70.2831195!2d21.7415298?hl=en-IN&entry=ttu">Click Here</a>
        </div>
          <h2 className="text-xl font-bold mb-2 mt-2">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-200 p-4 rounded-lg flex flex-col items-center">
              <img
                src={mihirimage2}
                alt="Mihir Jetpariya"
                className="rounded-full shadow-lg w-[200px] h-[200px]"
              />
              <h3 className="text-xl font-semibold mb-2 p-3">
                Mihir Jetpariya
              </h3>
              <p className="text-gray-700">Full-Stack Developer</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg flex flex-col items-center">
              <img
                src={pappaimage}
                alt="Vijay Jetpariya"
                className="rounded-full shadow-lg w-[200px] h-[200px]"
              />
              <h3 className="text-xl font-semibold mb-2 p-3">
                Vijay Jetpariya
              </h3>
              <p className="text-gray-700">Shop Owner</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg flex flex-col items-center">
              <img
                src={uncleimage}
                alt="Rajesh Jetpariya"
                className="rounded-full shadow-lg w-[200px] h-[200px]"
              />
              <h3 className="text-xl font-semibold mb-2 p-3">
                Rajesh Jetpariya
              </h3>
              <p className="text-gray-700">Shop Owner</p>
            </div>
          </div>
        </div>
        <div className="sm:w-[600px] sm:h-[500px] w-[250px] h-[250px]  mr-6 p-4">
          <Map ></Map>
        </div>
      </div>
      <Footer/>
    </>
  );
}
