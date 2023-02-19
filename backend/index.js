const { connection } = require(".//Config/db");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const { userController } = require("./Routes/userRoute");

app.get("/", (req, res) => {
  res.send("Welcome to cointab");
});

app.use("/", userController);

app.listen(8000, async () => {
  try {
    await connection;

    console.log("Database connected");
    console.log("Listening on port 8000");
  } catch (err) {
    console.log({ err });
  }
});
