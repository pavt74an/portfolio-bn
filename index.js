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

console.log(mongoURI);
console.log(PORT);

// routes
app.use('/port', router);


app.listen(PORT,  async () =>{
    try {
        await mongoose.connect(mongoURI);
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})
