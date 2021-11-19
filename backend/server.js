const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db');

require("dotenv").config();

const app = express();

//Establish DB connection
connectDB();

// (From) Shahbaz: Initializing/installing middleware; works using Express.js
//  
app.use(express.json({
  extended: false
}));


app.get('/', (req, res) => res.send('API is Running'));

// Defining Route
app.use('/api/users', require('./routes/api/users.js'));
// FIX ME: THE FOLLOWING ROUTE IS NOT WORKING! I HAVE DISABLED THE REQUIRED FIELDS AND YET IT IS STILL RESULTING IN 404s INSTEAD OF 400s!
app.use('/api/flight', require('./routes/api/flight.js'));
const port = process.env.PORT || 5000;

app.use(cors());
//app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
