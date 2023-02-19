import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios";
import { Flex, Img, Input } from '@chakra-ui/react';
import TableContainer from '../Components/TableContainer';
import Navbar from '../Components/Navbar';
const UserDetails = () => {
    const [userData , setUSerData]= useState([])
    const [loader , setLoader]= useState(true)
    const [gender,setGender] = useState("");

    const getUserData=async()=>{
setLoader(true)
        await axios.get(`http://localhost:8000/get-user/${gender}`)
         .then((res)=>{
          setLoader(false)
// console.log(res.data.userData,"userdb")
setUSerData(res.data.userData)
         }).catch((err)=>{
          console.log(err)
         })

    }

    useEffect(()=>{
getUserData()

    },[gender])
// handle filter

const handleGender=(gname)=>{
console.log(gname)
setGender(gname)
}

  return (

    <div className='userDetailPage'>
    <Navbar/>
    
    <Flex className='filterComp'>
    <div>
    Sort by gender :
    <br/>
    <input onChange={(e)=>handleGender(e.target.value)} type="radio" value="male" name="gender"/>
    <label>Male</label>
    <br/>
    <input onChange={(e)=>handleGender(e.target.value)} type="radio" value="female" name="gender"/>
    <label>Female</label>
    <br/>
    <input onChange={(e)=>handleGender(e.target.value)} type="radio" value="" name="gender"/>
    <label>All</label>
    </div>
       
    
    </Flex>
    
    {loader?<Img className='loader2' src="https://media.tenor.com/UnFx-k_lSckAAAAC/amalie-steiness.gif"/>:
    <div className='userTable'>
    {
(userData.length>0?
    <table>
    <tr>
    <th>Avatar</th>
    <th>Name</th>
    <th>Age</th>
    <th>Gender</th>
    <th>Email</th>
    <th>City</th>
    <th>Phone</th>
   
    </tr>
  {  userData?.map((item)=>(
    <TableContainer item={item}/>
  ))}

    </table>
  
  :"No record found..!!!"
     )   }
    </div>

    }
    
    </div>
  )
}

export default UserDetails