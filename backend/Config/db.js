
 const mongoose = require("mongoose")
const connection = mongoose.connect("mongodb+srv://satyam1516:161996@cluster0.ubnagby.mongodb.net/cointab_database?retryWrites=true&w=majority")
module.exports={
    connection
}