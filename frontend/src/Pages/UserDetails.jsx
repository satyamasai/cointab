import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Flex, Img, Input } from "@chakra-ui/react";
import TableContainer from "../Components/TableContainer";
import Navbar from "../Components/Navbar";
import { useSearchParams } from "react-router-dom";
let totalPage = 0;
const UserDetails = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams, "srchparms");
  const [userData, setUserData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [gender, setGender] = useState("");
  const [page, setPage] = useState(1);
  const [city, setCity] = useState("");
  const allcityarr = [];
  const getUserData = async () => {
    setLoader(true);
    await axios
      .get(
        `http://localhost:8000/get-user/?gender=${gender}&page=${page}&city=${city}`
      )
      .then((res) => {
        setLoader(false);
        // console.log(res.data.userData,"userdb")
        setUserData(res.data.userData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // cityarr-----------------
  userData.map((element) =>
    !allcityarr.includes(element.location.city)
      ? allcityarr.push(element.location.city)
      : null
  );
  console.log(allcityarr, "city");
  // ------------
  useEffect(() => {
    getUserData();
    // console.log(page,"pn")
  }, [gender, page]);
  // handle filter

  const handleGender = (gname) => {
    // console.log(gname)

    setGender(gname);
    setSearchParams({ gender: gname });
  };

  // [pagination]
  totalPage = userData.length / 10;
  let pbtnArr = [];

  for (let i = 0; i < totalPage; i++) {
    pbtnArr.push(i + 1);
  }

  const handlePage = (val) => {
    setPage(+val);
  };
  console.log(page, "page");

  return (
    <div className="userDetailPage">
      <Navbar />

      <Flex className="filterComp">
        <div className="gender">
          Sort by gender :
          <br />
          <input
            onChange={(e) => handleGender(e.target.value)}
            type="radio"
            value="male"
            name="gender"
          />
          <label>Male</label>
          <br />
          <input
            onChange={(e) => handleGender(e.target.value)}
            type="radio"
            value="female"
            name="gender"
          />
          <label>Female</label>
          <br />
          <input
            onChange={(e) => handleGender(e.target.value)}
            type="radio"
            value=""
            name="gender"
          />
          <label>All</label>
        </div>

        <div className="filtercity">
          <select>
            <option>Select city</option>
            {allcityarr?.map((cityname) => (
              <option>{cityname}</option>
            ))}
          </select>
        </div>
      </Flex>

      {loader ? (
        <Img
          className="loader2"
          src="https://media.tenor.com/UnFx-k_lSckAAAAC/amalie-steiness.gif"
        />
      ) : (
        <div className="userTable">
          {userData.length > 0 ? (
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
              {userData?.map((item) => (
                <TableContainer item={item} />
              ))}
            </table>
          ) : (
            "No record found..!!!"
          )}
        </div>
      )}
      <div className="pagination">
        <button
          disabled={page == 1}
          onClick={() => setPage(page - 1)}
          className="pbtn"
        >
          Prev
        </button>

        {pbtnArr.map((ele) => (
          <button
            onClick={(e) => handlePage(e.target.value)}
            value={+ele}
            className="pbtn centerbtn"
          >
            {ele}
          </button>
        ))}
        <button
          disabled={page > totalPage - 1}
          onClick={() => setPage(page + 1)}
          className="pbtn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
