import React, { useEffect, useState } from 'react'

export default function Users() {

    const [formData , setFormData] = useState([]);



    useEffect(()=> {
 
        const getUsers = async()=>{
            const res = await fetch('/api/user/getusers' , {
                method : "GET"
            })

            const data = await res.json();

            if(data.success === false)
                {
                    console.log(data.message);
                }
            
            setFormData(data)

        }




       getUsers()
    },[])

    console.log(formData)

  return (


    
    <div>
      
    </div>
  )
}
