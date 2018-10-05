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
    if (err) console.log(err);
    console.log("Connected to DB!");
});
global.db = db;

// db.query("SELECT * FROM contact where fname='Cindra'", function (err, result) {
//     if (err) console.log(err);
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
        //let q = req.query.search;
        let q = "'%" + req.query.search + "%'";
        var search = "SELECT DISTINCT contact.* " +
        "FROM contact " + 
        "LEFT JOIN address ON contact.contact_id = address.contact_id " + 
        "WHERE address_line LIKE" + q + "OR city LIKE " + q + " OR state LIKE " + q + 
        " OR fname LIKE " + q + " OR mname LIKE " + q + " OR lname LIKE " + q ;
        var search_count = "SELECT count(*) as count from (" + search + ") AS search";

        db.query(search_count, function (err, count) {
            if (err) console.log(err);
            console.log(count[0].count);
            db.query(search, function (err, search_result) {
                if (err) console.log(err);
                //console.log(search_result + " " + count + " " + req.query.search);
                res.render("index", {search_result : search_result,
                                     count     : count[0].count,
                                     search_query  : req.query.search});
            });
        });
    }
});

app.post('/add', function(req, res){
    console.log("POST request add : " + req.body.fname);
    console.log("POST request add : " + req.body.address_line[0]);
    console.log("POST request add : " + req.body.address_line[1]);
    console.log("POST request len : " + req.body.address_line.length);
    var sql = "INSERT INTO contact (fname, mname, lname) VALUES ?";
    var values = [
        [req.body.fname, req.body.mname, req.body.lname]
    ];
    console.log(values);
    
    if(req.body.fname == "" || req.body.mname == "" || req.body.lname == ""){
        console.log("did not insert");
    }
    else{
        db.query(sql, [values], function (err, result) {
            if (err) console.log(err);
            console.log("Number of records inserted: " + result.affectedRows + result.insertId);
            console.log(result);
        });
    }
    // var sql2 = "INSERT INTO address (contact_id, address_type, address_line, city, state, zip) VALUES ?";
    // var values = [
    //     [req.body.fname, req.body.mname, req.body.lname]
    // ];
    res.redirect('/');
});

app.get("/delete/:id", function(req, res){
    var id = req.params.id;
    console.log("delete route : " + id);
    var delete_from_address = "DELETE FROM address WHERE contact_id='" + id + "'";
    var delete_from_phone = "DELETE FROM phone WHERE contact_id='" + id + "'";
    var delete_from_date = "DELETE FROM date WHERE contact_id='" + id + "'";
    var delete_from_contact = "DELETE FROM contact WHERE contact_id='" + id + "'";
    db.query(delete_from_address, function (err, result) {
        if (err) console.log(err);
        console.log("Number of records deleted: " + result.affectedRows);
        
        db.query(delete_from_phone, function (err, result){
            if (err) console.log(err);
            console.log("Number of records deleted: " + result.affectedRows);
            
            db.query(delete_from_date, function (err, result){
                if (err) console.log(err);
                console.log("Number of records deleted: " + result.affectedRows);
                
                db.query(delete_from_contact, function (err, result){
                    if (err) console.log(err);
                    console.log("Number of records deleted: " + result.affectedRows);
                    console.log(result);
                    res.redirect('/');
                });
            });
        });
    });
    
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