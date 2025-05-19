const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user.route");

const app = express();
const portNo = 5000;
const DB_URI = "mongodb://127.0.0.1:27017/result";


// Enable CORS
app.use(cors({ origin: "http://localhost:3000" })); // Allow your React frontend

// Global middleware
app.use(express.json());

// Routes
app.use("/api/v1/user", userRoutes);

// DB connection
mongoose
  .connect(DB_URI)
  .then(() => console.log("DB Connected successfully"))
  .catch(err => console.error("ERROR WHILE CONNECTING DATABASE:", err));

// Server start
app.listen(portNo, () =>
  console.log(`Student result service is running at port ${portNo}`)
);
