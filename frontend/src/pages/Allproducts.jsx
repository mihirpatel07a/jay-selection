import React, { useState , useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Products from "./Products.jsx";

export default function Allproducts() {
  const [filters, setFilters] = useState({
    searchTerm: "",

    sort_order: "createdAt_desc",
    category: "",
    size: "xs",
    gender: "male",
    color: "black",
  });

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    const urlParams = new URLSearchParams(location.search);
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
    urlParams.set("sort", filters.sort_order);
    urlParams.set("size", filters.size);
    urlParams.set("gender", filters.gender);
    urlParams.set("color", filters.color);
    urlParams.set("category", filters.category);

    const searchQuery = urlParams.toString();
    navigate(`/products?${searchQuery}`);
  };

  const handleChange = (e) => {
    const { id, type, checked, value } = e.target;

    switch (type) {
      case "checkbox":
        if (checked) {
          setFilters((prevFilters) => ({
            ...prevFilters,
            [id]: [...prevFilters[id], value],
          }));
        } else {
          setFilters((prevFilters) => ({
            ...prevFilters,
            [id]: prevFilters[id].filter((item) => item !== value),
          }));
        }
        break;
      case "text":

      case "select-one": // For single select dropdowns
        setFilters({ ...filters, [id]: value });
        break;
      default:
        break;
    }
  };

  // console.log(filters)

  return (
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
          Listing Results:
        </h1>

        <Products />
      </div>
    </div>
  );
}
