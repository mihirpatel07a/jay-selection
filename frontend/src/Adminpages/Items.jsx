import React, { useEffect, useState } from 'react'
import EcommerceCard from './Ecommercecard'

export default function Items() {

    const [items , setItems] = useState([])

    useEffect(()=>{
 
        const getitems = async()=> {
            const res = await fetch('/api/item/getitems', {
                method : "GET"
            })

            const data = await res.json();

            if(data.success === false)
            {
                console.log(data.message)
                return; 
            }
            setItems(data);

        }

        getitems()
        
    },[])

    console.log(items);

  return (
   
    <div className="container mx-auto mt-5">
    {/* <h1 className="font-bold text-black text-center text-4xl mb-5">Items</h1> */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        {items.map((item, index) => (
            <EcommerceCard key={index} product={item} />
        ))}
    </div>
</div>
  )
}
