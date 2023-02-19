const {connection} = require(".//Config/db")
const express = require('express');
const app= express();

app.get("/",(req,res)=>{
            res.send("Welcome to cointab")
})


app.listen(8000,async()=>{
try{    
await 

console.log("Database connected")
console.log("Listening on port 8000")
}catch(err){
console.log({err})
}

})