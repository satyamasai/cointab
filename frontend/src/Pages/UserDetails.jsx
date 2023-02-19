import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios";
import { Img } from '@chakra-ui/react';
const UserDetails = () => {
    const [userData , setUSerData]= useState([])
    const [loader , setLoader]= useState(true)

    const getUserData=async()=>{
        await axios.get("http://localhost:8000/get-user")
         .then((res)=>{
          setLoader(false)
console.log(res.data.userData,"userdb")
setUSerData(res.data.userData)
         }).catch((err)=>{
          console.log(err)
         })

    }

    useEffect(()=>{
getUserData()

    },[])


  return (

    <div className='userDetailPage'>
    
    {loader?<Img className='loader2' src="https://media.tenor.com/UnFx-k_lSckAAAAC/amalie-steiness.gif"/>:
    <div>
    {
(userData.length>0?
      userData.map((item)=>(
<div>{item.name.first}</div>
      )):"No record found..!!!"
     )   }
    </div>

    }
    
    </div>
  )
}

export default UserDetails