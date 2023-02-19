import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from 'axios'
const Home = () => {
const [user,setUser]= useState([])
const [loading,setLoading] = useState(false)
  const handleFetchUser=async()=>{
setLoading(true)
await axios.get('https://randomuser.me/api/?results=50')
.then((res)=>{
  postIndb(res.data.results)
  // console.log("user",res.data.results)
})

}

// post in database
const postIndb=(users)=>{
setLoading(false)
console.log('users in db',users)
alert("USers save in DATABASE")

}




  return (
    <div className="home">
    {loading?<h1>Loading....</h1>:
    <div>
    
    <Button onClick={handleFetchUser} colorScheme={"blue"}>Fetch Users</Button>
    <Button colorScheme={"red"}>Delete Users</Button>
    <Button colorScheme={"red"}>Fetch Users</Button>
    </div>
    }
    </div>
  );
};

export default Home;
