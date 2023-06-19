const mysql = require("mysql")
require("dotenv").config()
const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DATABASE
})

db.connect((error)=>{
        if(error){
            console.error("Error while connecting to mySql !!");
        }else{
            console.log("connected to mysql")
        }
})

module.exports = db;