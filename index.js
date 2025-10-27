const express = require("express");
const app = express();
const connectDb = require("./config/db");
require("dotenv").config;
const port = process.env.PORT || 5000;
const cors = require("cors");
const uploadRoutes = require("./routes/upload.route");

app.use(express.json());

connectDb();
app.use(cors());

//routes
app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to supreman server");
});

app.listen(port, (req, res) => {
  console.log(`app is runing ${port}`);
});
