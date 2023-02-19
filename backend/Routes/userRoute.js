const { Router } = require("express");
const axios = require("axios");
const { userModel } = require("../Models/userModel");
const userController = Router();

userController.get("/fetch-user", async (req, res) => {
  await axios
    .get("https://randomuser.me/api/?results=5")
    .then((result) => {
      console.log("RES", result.data);
      res.send(result.data.results)
    })
    .catch((err) => {
      console.log("err", err);
    });

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

module.exports = {
  userController
};
