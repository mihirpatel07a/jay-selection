/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    theme: {
      extend: {
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import { useParams } from "react-router-dom";

const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "white", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Pdetails() {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

  const [item, setItem] = useState({
    title: "",
    description: "",
    brand: "",
    category: "",
    gender: "",
    size: [],
    color: [],
    price: 0,
    discount: 0,
    stock_quantity: 0,
    availability: false,
    imageUrls: [],
  });

  const params = useParams();

  const id = params.id;

  useEffect(() => {
    const getItem = async () => {
      try {
        const res = await fetch(`/api/item/getitem/${id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch item");
        }

        setItem({
          title: data.title,
          description: data.description,
          brand: data.brand,
          category: data.category,
          gender: data.gender,
          size: data.size,
          color: data.color,
          price: data.price,
          discount: data.discount,
          stock_quantity: data.stock_quantity,
          availability: data.availability,
          imageUrls: data.imageUrls,
        });
      } catch (error) {
        console.error("Error fetching item:", error);
        // Handle error state or alert user
      }
    };

    getItem();
  }, [id]);

  console.log(item);

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={item.imageUrls[0]}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={item.imageUrls[1]}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={item.imageUrls[2]}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={item.imageUrls[3]}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {item.title}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <p>
              <span className="text-3xl font-bold text-slate-900">
                Rs{item.price - item.discount}{" "}
              </span>
              <span className="text-sm text-slate-900 line-through">
                Rs{item.price}
              </span>
            </p>

            {/* Reviews */}
            <div className="mt-6">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating
                          ? "text-gray-900"
                          : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
            </div>

            <form className="mt-10">
              {/* Colors */}
              <div className="flex sm:flex-row flex-col gap-3 justify-between">
                <div className="flex gap-2 flex-wrap items-center">
                  <label className="font-semibold">Colors: </label>
                  <select
                    id="colors"
                    //   onChange={handleChange}
                    className="border rounded-lg p-2"
                  >
                    {item.color.map((color) => (
                      <option key={color} value={color}>
                        {color.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sizes */}
                <div className="flex gap-2 flex-wrap items-center">
                  <label className="font-semibold">Sizes: </label>
                  <select
                    id="sizes"
                    //   onChange={handleChange}
                    className="border rounded-lg p-2"
                  >
                    {item.size.map((size) => (
                      <option key={size} value={size}>
                        {size.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to bag
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{item.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 flex gap-10 ">
              <div>
                <h2 className="text-sm font-medium text-gray-900">
                  Availability 
                </h2>

                {item.availability ? (
                  <p className="text-sm text-gray-600">Available</p>
                ) : (
                  <p className="text-sm text-gray-600">Not Available</p>
                )}
              </div>

              <div>
                <h2 className="text-sm font-medium text-gray-900">
                  Category 
                </h2>

               
                  <p className="text-sm text-gray-600">{item.category}</p>
              
              </div>

              <div>
                <h2 className="text-sm font-medium text-gray-900">
                  Brand 
                </h2>

               
                  <p className="text-sm text-gray-600">{item.brand}</p>
             
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
