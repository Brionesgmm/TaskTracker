const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const session = require("express-session");
// const MongoStore = require("connect-mongo")(session);
const cors = require('cors');
const tasksRoutes = require("./routes/tasks");
const connectDB = require("./config/database");

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });
console.log(process.env.DB_STRING)

//Connect To Database
connectDB();

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Setup Sessions - stored in MongoDB
// app.use(
//     session({
//       secret: "keyboard cat",
//       resave: false,
//       saveUninitialized: false,
//       store: new MongoStore({ mongooseConnection: mongoose.connection }),
//     })
//   );

//Setup Routes For Which The Server Is Listening
app.use("/", tasksRoutes);


  //Server Running
app.listen(process.env.PORT, () => {
    console.log("Server is running, you better catch it!");
  });