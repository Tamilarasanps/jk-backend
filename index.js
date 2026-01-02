const express = require("express");
const app = express();
const connectDb = require("./config/db");
const cors = require("cors");
const uploadRoutes = require("./routes/upload.route");
const priceRoute = require("./routes/price.routes");
const pdfRoute = require("./routes/pdfRoutes");
require("dotenv").config();

const port = process.env.PORT || 5000;

// ✅ CORS must come before routes
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5173"], // your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static("public"));

// ✅ Connect DB before starting server
connectDb();

// ✅ Register routes after middleware
app.use("/api", uploadRoutes);
app.use("/prices", priceRoute);
app.use("/api", pdfRoute);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Welcome to supreman server");
});

app.listen(port, () => {
  console.log(`✅ App is running on port ${port}`);
});
11;
