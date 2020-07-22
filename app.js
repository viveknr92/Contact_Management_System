var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mysql = require('mysql');

const {search} = require("./routes/search");
const {addpage, add_contact} = require("./routes/add_contact");
const {delete_contact} = require("./routes/delete_contact");
const {update_contact} = require("./routes/update_contact");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

var db = mysql.createConnection({
    host: "192.168.1.122",
    user: "root",
    password: "root",
    database:"contact_manager"
});

db.connect(function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Connected to DB!");
});
global.db = db;

app.get('/', search);

app.get("/addpage", addpage);

app.post('/add', add_contact);

app.post("/edit/:id", update_contact);

app.get("/delete/:id", delete_contact);


app.listen(3000, "0.0.0.0", function(){
    console.log("Server started at 3000");
});