import { Button, Img } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Home = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleFetchUser = async () => {
    setLoading(true);

    await axios.get("http://localhost:8000/userdb").then((res) => {
      postIndb(res.data);
      console.log("user", res.data);
    });
  };

  // post in database
  const postIndb = (users) => {
    setLoading(false);
    // console.log('users in db',users)
    alert("Users saved in DATABASE");
  };

  // delete user 
const deleteUsers=async()=>{
  setLoading(true)
  try{
    
    await axios.delete("http://localhost:8000/delete-all")
    .then((res)=>console.log(res))
    setLoading(false)
}
catch(err){
  console.log(err)
}


}


  return (
    <div className="home">
      {loading ? (
        <img className="loader" src="https://media.tenor.com/6gHLhmwO87sAAAAi/gg.gif" alt="loader_img"/>
      ) : (
        <div>
          <Button onClick={handleFetchUser} colorScheme={"blue"}>
            Fetch Users
          </Button>
          <Button onClick={deleteUsers} colorScheme={"red"}>Delete Users</Button>
          <Link to={"/user-details"}>
          <Button colorScheme={"red"}> User Details</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
