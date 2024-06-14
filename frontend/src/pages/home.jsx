import React from 'react'
import { useSelector } from 'react-redux'


export default function Home() {

  const {currentUser} = useSelector((state)=> state.user);

  console.log(currentUser.data.password)
  return (
    <div>
       
      <h1> home page</h1>
      <h1>{currentUser.data.username}</h1>

    </div>
  )
}
