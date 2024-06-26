import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {app} from "../firebase.js";

export default function UpdateItem() {
  const [formData, setFormData] = useState({
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

  const [size, setSizes] = useState([]);
  const [color, setColor] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const id = params.id;

  useEffect(() => {
    const getItem = async () => {
      try {
        const res = await fetch(`/api/item/getitem/${id}`);
        const data = await res.json();
  
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch item");
        }
  
        setFormData({
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
  
  

  const handleSizeChange = (e) => {
    const selectedSizes = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSizes(selectedSizes);
    setFormData({
      ...formData,
      size: selectedSizes,
    });
  };

  const handlecolorchange = (e) => {
    const selectedcolors = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setColor(selectedcolors);
    setFormData({
      ...formData,
      color: selectedcolors, // Update to "sizes" to match backend
    });
  };

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length <= 6) { // Check if files length is within allowed limit
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
  
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
  
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls.slice(0, 6 - formData.imageUrls.length)), // Concatenate new URLs, ensuring not to exceed 6
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError(err.message);
          setUploading(false);
        });
    } else if (files.length > 6) { // Handle case where more than 6 images are uploaded
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    } else {
      setImageUploadError("Please select at least one image to upload");
      setUploading(false);
    }
  };


  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const filename = new Date().getTime() + file.name;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle progress (optional)
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          // Handle unsuccessful uploads
          reject(error);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL);
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  };

  const handlechange = (e) => {
    if (e.target.id === "availability") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    } else if (e.target.id === "stock_quantity" || e.target.type === "text" || e.target.type === "number" || e.target.type === "textarea") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = {
        title: formData.title,
        description: formData.description,
        brand: formData.brand,
        category: formData.category,
        gender: formData.gender,
        size: size,
        color: color,
        price: Number(formData.price),
        discount: Number(formData.discount),
        stock_quantity: Number(formData.stock_quantity),
        availability: formData.availability,
        imageUrls: formData.imageUrls,
      };
  
      const response = await fetch(`/api/item/updateitem/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to update item");
      }
  
      alert("Item successfully updated!");
      navigate('/admin/items')
      
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item. Please try again.");
    }
  };
  
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  console.log(formData);


  return (
    <div className="mx-3 max-w-auto">
      <h1 className="font-bold text-black text-center text-4xl mt-3 mb-3">
        Create Item
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Title"
            className="rounded-lg p-3 border"
            id="title"
            onChange={handlechange}
            required
            defaultValue={formData.title}
          />
          <textarea
            placeholder="Description"
            className="border p-3"
            id="description"
            onChange={handlechange}
            required
            defaultValue={formData.description}
          />
          <input
            type="text"
            placeholder="Brand"
            className="rounded-lg p-3 border"
            id="brand"
            onChange={handlechange}
            required
            defaultValue={formData.brand}
          />
          <input
            type="text"
            placeholder="Category"
            className="rounded-lg p-3 border"
            id="category"
            onChange={handlechange}
            required
            defaultValue={formData.category}
          />
          <input
            type="text"
            placeholder="Gender"
            className="rounded-lg p-3 border"
            id="gender"
            onChange={handlechange}
            required
            value={formData.gender}
          />

          <div className="flex sm:flex-row flex-col gap-6 ">
            <div className="flex sm:flex-row flex-col gap-4">
              <p className="ml-2 text-lg">Select Size:</p>
              <select
                multiple={true}
                className="rounded-lg p-3 border w-[200px] h-[100px] "
                id="sizes"
                onChange={handleSizeChange}
                required
                value={formData.size}
              >
                <option
                  className="border border-sky-100 rounded-lg m-1"
                  value="XS"
                >
                  XS
                </option>
                <option
                  className="border border-sky-100 rounded-lg m-1"
                  value="S"
                >
                  S
                </option>
                <option
                  className="border border-sky-100 rounded-lg m-1"
                  value="M"
                >
                  M
                </option>
                <option
                  className="border border-sky-100 rounded-lg m-1"
                  value="L"
                >
                  L
                </option>
                <option
                  className="border border-sky-100 rounded-lg m-1"
                  value="XL"
                >
                  XL
                </option>
              </select>
            </div>

            <div className="flex sm:flex-row flex-col gap-4">
              <p>select Color:</p>
              <select
                multiple={true}
                className="rounded-lg p-3 border w-[200px] h-[100px]"
                id="colors"
                onChange={handlecolorchange}
                required
                value={formData.color}
              >
                <option
                  className="border border-sky-100 rounded-lg m-1"
                  value="black"
                >
                  Black
                </option>
                <option
                  className="border border-sky-100 rounded-lg m-1"
                  value="white"
                >
                  White
                </option>
                <option
                  className="border border-sky-100 rounded-lg m-1"
                  value="blue"
                >
                  Blue
                </option>
                <option
                  className="border border-sky-100 rounded-lg m-1"
                  value="red"
                >
                  Red
                </option>
                <option
                  className="border border-sky-100 rounded-lg m-1"
                  value="green"
                >
                  Green
                </option>
              </select>
            </div>
          </div>

          <div className="flex sm:flex-row flex-col gap-4">
            <input
              type="number"
              placeholder="Price"
              className="rounded-lg p-3 border"
              id="price"
              onChange={handlechange}
              required
              value={formData.price}
            />

            <input
              type="number"
              placeholder="discount"
              className="rounded-lg p-3 border"
              id="discount"
              onChange={handlechange}
              value={formData.discount}
            />
          </div>

          <div className="flex sm:flex-row flex-col gap-4">
            <input
              type="number"
              placeholder="Quantity"
              className="rounded-lg p-3 border"
              id="stock_quantity"
              onChange={handlechange}
              required
              value={formData.stock_quantity}
            />

            <div className="flex flex-wrap gap-3">
              <input
                type="checkbox"
                id="availability"
                className="w-5"
                onChange={handlechange}
                checked={formData.availability}
                required
              />

              <label className="">Availabilty</label>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>

          <div className="flex gap-4">
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              className="p-2 border border-gray-300 rounded w-[500px]"
              onChange={(e) => setFiles(e.target.files)}
            />
            <button
              type="button"
              className="p-3 bg-slate-700 text-white text-center rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              onClick={handleImageSubmit}
            >
              {uploading ? "Uploading.." : "Upload"}
            </button>
          </div>

          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>

          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((urls, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between p-4 border w-full"
                >
                  <img
                    src={urls}
                    key={urls}
                    className="object-contain rounded=-lg w-20 h-20 "
                  ></img>
                  <button
                    type="button"
                    className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                    onClick={() => handleRemoveImage(index)}
                  >
                    Delete
                  </button>
                </div>
              );
            })}

          <button className="p-3 bg-slate-700 w-auto sm:w-[600px] text-white text-center rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Update Item
          </button>

          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </div>
  );
}
