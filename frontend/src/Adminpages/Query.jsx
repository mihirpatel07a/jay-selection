import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Query() {
  const [query, setQuery] = useState([]);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const res = await fetch("/api/query/getqueries");

        const data = await res.json();

        if (data.success === false) {
          console.log(data.message);
          return;
        }
        setQuery(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQueries();
  }, []);

   
  const handleDelete = async (id)=> {
     try{
         
        const res = await fetch(`/api/query/delete/${id}`, {
            method : "DELETE"
        })
        const data = await res.json();
  
        if(data.success === false){
          console.log(data.message);
          return;
        }
        location.reload();
     }
     catch(error)
     {
        console.log(error);
     }
  }


  return (
    <>
   

     {query.length === 0 ? (
        <div className="text-3xl text-center p-3">Queries not found....</div>
      ) : (
<div className="my-3 overflow-x-auto max-w-7xl mx-auto ">
  <table className="min-w-full border rounded-md overflow-hidden ">
    <thead className="bg-gray-200 dark:bg-gray-700 text-white">
      <tr>
        <th className="py-2 px-4 border-b">Name</th>
        <th className="py-2 px-4 border-b">Email</th>
        <th className="py-2 px-4 border-b">Query</th>
        <th className="py-2 px-4 border-b">Send</th>
        <th className="py-2 px-4 border-b">Actions</th>
      </tr>
    </thead>
    <tbody>
      {query.map((q) => (
        <tr key={q._id} className="border-b ">
          <td className="py-2 px-4">{q.name}</td>
          <td className="py-2 px-4">{q.email}</td>
          <td className="py-2 px-4">{q.message}</td>
          <td className="py-2 px-4">

          <Link
            to={`mailto:${q.email}?subject=Regarding query `}
            className=" font-semibold  text-center text-black p-1 uppercase rounded-sm hover:opacity-95"
          >
            Send Message
          </Link>
          </td>
          <td className="py-2 px-4">
            <button className="text-red-700 uppercase" onClick={()=> handleDelete(q._id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
      )}


    
    </>
  );
}
