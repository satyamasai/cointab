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
  // console.log(searchParams, "srchparms");
  const [userData, setUserData] = useState([]);
  const [cityStateData, setCityStateData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [gender, setGender] = useState("");
  const [page, setPage] = useState(1);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [active,setActive]= useState(true)
const limit=10
  const allcityarr = [];
  const allstatearr = [];
  // ----function for city state fetch
  const getCityState=async()=>{
    await axios
    .get(
      `https://cointab-v1zx.onrender.com/userdb1`
    )
    .then((res) => {
      // setLoader(false);
      console.log(res.data.result)
      setCityStateData(res.data.result);
      // console.log(res.data.userData,"userdb")
    })
    .catch((err) => {
      console.log(err);
    });
  }
  useEffect(()=>{getCityState()},[])

  const getUserData = async () => {
    setLoader(true);
    await axios
      .get(
        `https://cointab-v1zx.onrender.com/get-user/?gender=${gender}&page=${page}&city=${city}&state=${state}`
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
  cityStateData.map((element) =>
    !allcityarr.includes(element.location.city)
      ? allcityarr.push(element.location.city)
      : null
  );
  // console.log(allcityarr, "city");

  // --all state arr
  cityStateData.map((element)=>(
    !allstatearr.includes(element.location.state)
    ? allstatearr.push(element.location.state)
    : null
  ))

  // ------------
  useEffect(() => {
    getUserData();
    // console.log(page,"pn")
    // setSearchParams({city})
    setSearchParams({gender,city,state,page,limit})
  }, [gender, page,city,state,page]);
  // handle filter

  const handleGender = (gname) => {
    // console.log(gname)

    setGender(gname);
    // setSearchParams({ gender: gname });
  };

  // [pagination]
  totalPage = cityStateData.length / 10;
  let pbtnArr = [];

  for (let i = 0; i < totalPage; i++) {
    pbtnArr.push(i + 1);
  }

  const handlePage = (val) => {
    setPage(+val);
  };
  // console.log(page, "page");
  // console.log(city, "city");

  return (
    <div className="userDetailPage">
      <Navbar />

      <Flex className="filterComp">
        <div className="gender">
          Filter by gender :
          <br />
          <input
             checked={gender=="male"}
            onChange={(e) => handleGender(e.target.value)}
            type="radio"
            value="male"
            name="gender"
          />
          <label>Male</label>
          <br />
          <input
          checked={gender=="female"}
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
          <select
          
            onChange={(e) => {
              setCity(e.target.value);
            }}
          >
            <option  value="">Filter by city</option>
            <option value="">All city</option>
            {allcityarr?.map((cityname,index) => (
              <option key={index} >{cityname}</option>
            ))}
          </select>
        </div>

        {/*  ------select state ---*/}
        <div className="filterstate">
        <select
        
          onChange={(e) => {
            setState(e.target.value);
          }}
        >
          <option value={""}>Filter by state</option>
          <option value="">All state</option>
          {allstatearr?.map((statename,index) => (
            <option key={index} >{statename}</option>
          ))}
        </select>
      </div>
        
        
        {/*  ------select state ---*/}
        
        
        </Flex>
        
        {/*  ------paginatione ---*/}
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
          className={`pbtn centerbtn ${active}`} 
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
                <th>State</th>
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
          <button type="button" disabled={page==ele}
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
