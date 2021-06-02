

var mysql = require('mysql');
var db;
var settings = {

    host:"localhost",
    user:"root",
    password:"",
    database:"expresscrudapp"

};

function connectDatabase(){
    if (!db){
        db = mysql.createConnection(settings);

        db.connect(function (err){
            if(!err){
                console.log("Database connected");
            } else {
                console.log("Error connection");
           
            }
        })
    }
    return db;
}

module.exports = connectDatabase();