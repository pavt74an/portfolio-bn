const mongoose = require("mongoose");
const express = require("express");
const { Project, ProjectDetail, ProjectStatus } = require('./model/projectSchema');
const router = require('./route/projectRoute');


const app = express();
app.use(express.json());

const mongoURI = "mongodb://rootuser:rootpass@localhost:27017/janlopster?authSource=admin";

const PORT = 8002;

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
