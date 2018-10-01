var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");


var mysql = require('mysql');
// var mysql2 = require('mysql2');
// const Sequelize = require('sequelize');


var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database:"contact_manager"
  });

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected to DB!");
});
global.db = db;

// db.query("SELECT * FROM contact where fname='Cindra'", function (err, result) {
//     if (err) throw err;
//     console.log(result);
// });

// app.get('/', function(req, res){
//     res.render("index");
// });
app.get('/', function(req, res){
    if (typeof req.query.search === "undefined"){
        res.render("index", {result:null});
    }
    else{
        console.log("search : " + req.query.search);
        var name = "SELECT * FROM contact where fname='" + req.query.search + "'";
        db.query(name, function (err, result) {
            if (err) throw err;
            console.log(result);
            //console.log("result[0].fname : " + result[0].fname);
            //console.log(result[0]);
            res.render("index", {result:result});
        });
    }
});

app.post('/add', function(req, res){
    console.log("POST request add : " + req.body.fname);
    console.log("POST request add : " + req.body.address[0]);
    console.log("POST request add : " + req.body.address[1]);
    console.log("POST request len : " + req.body.address.length);
    var sql = "INSERT INTO contact (fname, mname, lname) VALUES ?";
    var values = [
        [req.body.fname, req.body.mname, req.body.lname]
    ];
    console.log(values);
    if (req.body.fname != "" || req.body.mname != "" || req.body.lname != ""){
        db.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows + result.insertId);
            console.log(result);
        });
    }
    else{
        console.log("did not insert");
    }
    res.redirect('/');
});

app.get("/delete/:id", function(req, res){
    console.log("delete route : " + id);
    var id = req.params.id;
    var sql = "DELETE FROM contact WHERE contact_id='" + id + "'";
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
        console.log(result);
    });
    res.redirect('/');
});

// app.get("/edit/:id", function(req, res){
//     var id = req.params.id;
//     console.log("edit route : " + id);
//     res.redirect('/');
// });
// app.get('/edit/:id', editPlayerPage);
// app.get('/delete/:id', deletePlayer);
// app.post('/edit/:id', editPlayer);

// app.post("/add", function(req, res){
//     console.log(req.body);
//     res.send("POSTED");
// });
// app.get("/:thing", function(req, res){
//     var thing = req.params.thing;
//     res.render("home", {thingVar:thing});
// });



app.listen(3000, "localhost", function(){
    console.log("Server started at 3000");
});