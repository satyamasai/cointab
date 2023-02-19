import { Button, Img } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
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
    alert("USers save in DATABASE");
  };

  return (
    <div className="home">
      {loading ? (
        <img src="https://cdn.dribbble.com/users/1787505/screenshots/7300251/media/a351d9e0236c03a539181b95faced9e0.gif" alt="loader_img"/>
      ) : (
        <div>
          <Button onClick={handleFetchUser} colorScheme={"blue"}>
            Fetch Users
          </Button>
          <Button colorScheme={"red"}>Delete Users</Button>
          <Button colorScheme={"red"}>Fetch Users</Button>
        </div>
      )}
    </div>
  );
};

export default Home;
