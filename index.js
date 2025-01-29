require('dotenv').config()
const mongoose = require("mongoose");
const express = require("express");
const { Project, ProjectDetail, ProjectStatus } = require('./src/model/projectSchema');
const router = require('./src/route/projectRoute');

console.log(process.env.MONGO_URL);
console.log(process.env.PORT_DB);


const app = express();
app.use(express.json());

const mongoURI = process.env.MONGO_URL;

const PORT = process.env.PORT_DB ;
mongoose.connect(mongoURI)
  .then(() => console.log(" Connected to MongoDB Atlas"))
  .catch(err => console.error(" MongoDB Connection Error:", err));




// routes
app.use('/port', router);


