import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

export default function EcommerceCard(props) {
  
  const handleDeleteItem =  async(id)=> {

    const res = await fetch(`/api/item/deleteitem/${id}` , {
      method : "DELETE"
    })

    const data = await res.json();

    if(data.success === false)
      {
         console.log(data.message)
         return
      }

      alert("successfully deleted")
      window.location.reload();
      
  } 

  return (
    <Card
      className="max-w-sm w-[250px]  m-2  p-2 shadow-lg"
      imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
    >
      <img
        className="h-[250px] w-[250px] self-center rounded-lg"
        src={props.product.imageUrls[0]}
      ></img>

      <div className="flex items-center justify-between">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight  dark:text-black">
            {props.product.title}
          </h5>
        </a>

        <span className="text-xl font-semibold text-gray-900 dark:text-black">
          {props.product.price} Rs
        </span>
      </div>

    <p>{props.product.brand}</p>

      <div className="flex items-center justify-between">
        <Link to={`/admin/updateitem/${props.product._id}`} className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
          Update 
        </Link>
        <button onClick={()=> handleDeleteItem(props.product._id)} className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
          Delete
        </button>
      </div>
    </Card>
  );
}
