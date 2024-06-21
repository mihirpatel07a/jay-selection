import React, { useEffect, useState } from "react";

export default function Products({ item }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === item.imageUrls.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearTimeout(timer); // Clean up the timer
  }, [currentImageIndex, item.imageUrls.length]);

  return (
    <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <a
        href={`/product/${item._id}`}
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
      >
        <img
          src={item.imageUrls[currentImageIndex]}
          alt="product image"
          className="object-cover h-[250px] w-[250px] self-center rounded-lg"
        />
        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
          {(item.discount * 100) / item.price}% OFF
        </span>
      </a>
      <div className="mt-4 px-5 pb-5">
        <a href="#">
          <h5 className="text-xl tracking-tight text-slate-900">
            {item.title} - {item.color[0]}
          </h5>
        </a>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">
              Rs{item.price - item.discount}{" "}
            </span>
            <span className="text-sm text-slate-900 line-through">
              Rs{item.price}
            </span>
          </p>
          <div className="flex items-center">
            {/* Star icons */}
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className="h-5 w-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2.142l1.604 3.893a1 1 0 0 0 .766.553l4.12.377c.905.083 1.27 1.199.577 1.808l-3.11 2.684a1 1 0 0 0-.332.943l.924 4.276c.417.966-.545 1.743-1.343 1.168l-3.832-2.246a1 1 0 0 0-1.046 0l-3.832 2.246c-.798.575-1.76-.202-1.343-1.168l.924-4.276a1 1 0 0 0-.332-.943L3.11 8.873c-.693-.609-.328-1.725.577-1.808l4.12-.377a1 1 0 0 0 .766-.553L10 2.142z"
                  clipRule="evenodd"
                />
              </svg>
            ))}
          </div>
        </div>
        {/* <a
          href="#"
          className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add to cart
        </a> */}
      </div>
    </div>
  );
}
