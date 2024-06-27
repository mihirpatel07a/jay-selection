import React, { useState , useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Products from "./Products.jsx";
import EcommerceCard from "../Adminpages/Ecommercecard.jsx";
import Footer from "./Footer.jsx";

export default function Allproducts() {
  const [filters, setFilters] = useState({
    searchTerm: "",
    sort: "createdAt",
    order : "desc",
    category: "",
    size: "",
    gender: "male",
    color: "black",
  });

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sizeFromUrl = urlParams.get("size");
    const genderFromUrl = urlParams.get("gender");
    const colorFromUrl = urlParams.get("color");
    const categoryFromUrl = urlParams.get("category");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      sizeFromUrl ||
      genderFromUrl ||
      colorFromUrl ||
      categoryFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setFilters({
        searchTerm: searchTermFromUrl || "",
        sort: sortFromUrl  || "createdAt",
        order :orderFromUrl || "desc",
        category:categoryFromUrl || "",
        size: sizeFromUrl || "",
        gender: genderFromUrl || "male",
        color: colorFromUrl || "black",
      });
    }

    const fetchItems = async () => {
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/item/getitems?${searchQuery}`);

      const data = await res.json();
      if (data.length > 4) setShowMore(true);
      else setShowMore(false);

      setItems(data);
      setLoading(false);
    };

    fetchItems();
  }, [location.search]);

  console.log(items);

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", filters.searchTerm);
    urlParams.set("sort", filters.sort);
    urlParams.set("size", filters.size);
    urlParams.set("gender", filters.gender);
    urlParams.set("color", filters.color);
    urlParams.set("category", filters.category);
    urlParams.set("order" , filters.order);


    const searchQuery = urlParams.toString();
    navigate(`/products?${searchQuery}`);


  };

  const handleChange = (e) => {
    const { id, type, checked, value } = e.target;
  
    switch (id) {
      case "searchTerm":
      case "category":
        // For text inputs
        setFilters({ ...filters, [id]: value });
        break;
      case "sizes":
      case "gender":
      case "colors":
        // For select dropdowns
        setFilters({ ...filters, [id]: value });
        break;
      case "sort_order":
        // For select dropdown with specific logic
        const [sort, order] = value.split("_");
        setFilters({ ...filters,  sort, order });
        break;
      default:
        break;
    }
  };
  

  

  return (
    <>
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap"> Search Term:</label>
            <input
              type="text"
              id="searchTerm"
              onChange={handleChange}
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
            />
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Sizes: </label>
            <select
              id="sizes"
              onChange={handleChange}
              className="border rounded-lg p-2"
            >
              {["xs", "s", "m", "l", "xl"].map((size) => (
                <option key={size} value={size}>
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Gender: </label>
            <select
              id="gender"
              onChange={handleChange}
              className="border rounded-lg p-2"
            >
              {["male", "female"].map((gender) => (
                <option key={gender} value={gender}>
                  {gender.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Colors: </label>
            <select
              id="colors"
              onChange={handleChange}
              className="border rounded-lg p-2"
            >
              {["black", "yellow", "white", "blue"].map((color) => (
                <option key={color} value={color}>
                  {color.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort: </label>
            <select
              onChange={handleChange}
              id="sort_order"
              defaultValue="createdAt_desc"
              className="border rounded-lg p-2"
            >
              <option value="regularPrice_desc">Price High to Low</option>
              <option value="regularPrice_asc">Price Low to High</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <label className="whitespace-nowrap font-semibold">
              Category:{" "}
            </label>
            <input
              type="text"
              id="category"
              placeholder="Enter Category"
              className="border rounded-lg p-2 w-full"
              onChange={handleChange}
            />
          </div>

          <button className="bg-slate-700 text-white rounded-lg p-2 hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="">
        <h1 className="text-2xl font-semibold border-b p-3 text-slate-700 mt-1">
          Product Results:
        </h1>

        <div className="container mx-auto mt-2">
    {/* <h1 className="font-bold text-black text-center text-4xl mb-5">Items</h1> */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 justify-items-center p-3 ">
        {items && items.map((item, index) => (
            <Products key={index} item={item} />
        ))}


       


    </div>
    <div>
    {
    items.length == 0 &&  <p className='text-center font-bold text-4xl mt-5'>No items Available</p>
}
    </div>
</div>
      
      </div>
    </div>
    <Footer/>
    </>
  );
}
