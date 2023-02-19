const { Router } = require("express");
const axios = require("axios");
const { userModel } = require("../Models/userModel");
const userController = Router();



userController.get("/get-user", async (req, res) => {
  console.log(req.query,"query")
  const {city,gender,state,page}= req.query
 
  const query = {}

  if(gender){
    query.gender=gender
  }
  if(city){
    query["location.city"] = city
  }
  if(state){
    query["location.state"] = state

  }
  if(page){
    query
  }
  // console.log(req.body)  
  const userData= await userModel.find(query).skip(page).limit(10);
  // console.log(userData)
  res.send({userData})

});



 

// add data to mongodb
userController.get("/userdb",async (req,res)=>{
    await axios
    .get("https://randomuser.me/api/?results=50")
    .then(async (result) => {
        // console.log("RES", result.data.results);
        await userModel.insertMany(result.data.results)
        res.send({"msg":"user added successfully to db","result":result.data.results})
    })
    .catch((err) => {
      console.log("err", err);
    });


})


// for city state name only

userController.get("/userdb1",async (req,res)=>{
  await axios
  .get("https://randomuser.me/api/?results=50")
  .then(async (result) => {
      // console.log("RES", result.data.results);
      // await userModel.insertMany(result.data.results)
      res.send({"msg":"user added successfully to db","result":result.data.results})
  })
  .catch((err) => {
    console.log("err", err);
  });


})

// for deleting all the data in database
userController.delete("/delete-all",async (req,res)=>{

        await userModel.deleteMany()

        res.send({"msg":"user deleted successfully from db"})
    })



module.exports = {
  userController
};
