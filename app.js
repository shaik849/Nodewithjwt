const express = require('express');

const app = express();

const cookieParser = require('cookie-parser')
app.use(cookieParser())
const mongoose = require("mongoose")
const env = require('dotenv').config()
const bodyParser = require("body-parser")
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = require("./Router/router")
app.use("",router)

const url = `mongodb+srv://${process.env.DB_username}:${process.env.DB_password}@cluster0.l162asa.mongodb.net/myDatabase`;

async function main(){
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() =>{console.log("connected.....")})
}

main().catch(err => console.log(err))

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})