const { Router } = require("express");
const axios = require("axios");
const { userModel } = require("../Models/userModel");
const userController = Router();

userController.get("/get-user", async (req, res) => {
  console.log(req.query,"query")
  // console.log(req.body)  
  const userData= await userModel.find();
  // console.log(userData)
  res.send({userData})

});
// for male users

userController.get("/get-user/male", async (req, res) => {
    console.log(req.body)  
    const userData= await userModel.find({"gender":"male"});
    console.log(userData)
    res.send({userData})
  
  });


  // for filter female user
  userController.get("/get-user/female", async (req, res) => {
    console.log(req.body)  
    const userData= await userModel.find({"gender":"female"});
    console.log(userData)
    res.send({userData})
  
  });

// add data to mongodb
userController.get("/userdb",async (req,res)=>{
    await axios
    .get("https://randomuser.me/api/?results=50")
    .then(async (result) => {
        console.log("RES", result.data.results);
        await userModel.insertMany(result.data.results)
        res.send({"msg":"user added successfully to db"})
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
