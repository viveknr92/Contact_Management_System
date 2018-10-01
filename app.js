var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");


var mysql = require('mysql');
// var mysql2 = require('mysql2');
// const Sequelize = require('sequelize');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database:"contact_manager"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });


con.query("SELECT * FROM contact where fname='Cindra'", function (err, result) {
    if (err) throw err;
    console.log(result[0].fname);
});


app.get("/", function(req, res){
    res.send("home");
});

app.get("/next", function(req, res){
    var thing = req.params.thing;
    res.render("next");
});

app.post("/add", function(req, res){
    console.log(req.body);
    res.send("POSTED");
});
app.get("/:thing", function(req, res){
    var thing = req.params.thing;
    res.render("home", {thingVar:thing});
});

app.get("/index", function(req, res){
    res.render("index");
});



app.listen(3000, "localhost", function(){
    console.log("Server started at 3000");
});