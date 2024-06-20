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

    const handleDeleteUser = async(id)=>{

        const res = await fetch(`/api/user/delete/${id}`, {
            method : "DELETE"
        })

        const data = await res.json();

        if(data.success === false)
            {
                console.log(data.message);
                return;
            }

        alert("Successfully Deleted");
        window.location.reload();
    }



    return (
      <div className="flex flex-col p-3 m-3">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mx-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                   
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {formData.map(user => (
                    <tr key={user.email}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={user.avatar} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.username}</div>
                           
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                      
                      </td>
                    
                     
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                       <button className="p-3 bg-slate-700 text-white text-center rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              onClick={()=> handleDeleteUser(user._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
