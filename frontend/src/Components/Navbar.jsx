import { Button } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // delete user 
 const deleteUsers=async()=>{
  // setLoading(true)
  try{
    
    await axios.delete("https://cointab-v1zx.onrender.com/delete-all")
    .then((res)=>console.log(res))
    // setLoading(false)
    alert("user deleted from database")
    window.location.href="/"
}
catch(err){
  console.log(err)
}


}
  return (

    <div className="navbar">
    <Link to="/">
    <Button colorScheme={"blue"}>Home</Button>
    </Link>
    <Button onClick={deleteUsers} colorScheme={"red"}>Delete Users</Button>
    
    
    
    </div>
    ) 
};

export default Navbar;
