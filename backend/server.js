const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

//Establish DB connection
connectDB();

app.get("/", (req, res) => res.send("API is Running"));

// Defining Route
app.use("/api/auth", require("./routes/api/auth.js"));

app.use("/api/users", require("./routes/api/users.js"));
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
