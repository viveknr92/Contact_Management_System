var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

var mysql = require('mysql');

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

app.get('/', function(req, res){
    if (typeof req.query.search === "undefined"){
        res.render("index", {search_result : null,
            comment : "Search Contacts using the search box",
            search_query  : ""});
    }
    else if (req.query.search.length < 3 || !req.query.search.replace(/\s/g, '').length){
        res.render("index", {search_result : null,
            comment : "Enter a search query greater than 2",
            search_query  : req.query.search});
    }
    else{
        
        console.log("search : " + req.query.search);
        var search = "SELECT DISTINCT contact.* from Contact\
        left join address on contact.contact_id = address.contact_id\
        left join phone on contact.contact_id = phone.contact_id\
        left join date on contact.contact_id = date.contact_id where ";
        var string_array = req.query.search.split(" ");
        console.log("string_array : " + string_array);
        for (var str of string_array){
            console.log("string : " + str);
            let q = "'%" + str + "%'";
            search = search + " (contact.contact_id LIKE "+q+" OR address_line LIKE "+q+" OR city LIKE "+q+" OR state LIKE "+q+" OR zip LIKE "+q+"\
                    OR fname LIKE "+q+" or mname LIKE "+q+" OR lname LIKE "+q+"\
                    OR area_code LIKE "+q+" OR number LIKE "+q+" OR date LIKE "+q+ "OR CONCAT(area_code,'', number) LIKE "+q+") AND ";
        }
        
        search = search.substring(0, search.length - 4);
        console.log("search ------------------------------------------ : " + search);
        var search_count = "SELECT count(*) as count from (" + search + ") AS search";
        db.query(search_count, function (err, count) {
            if (err) console.log(err);
            console.log(count[0].count);
            db.query(search, function (err, search_result) {
                if (err) console.log(err);
                console.log(search_result + " " + count + " " + req.query.search);
                res.render("index", {search_result : search_result,
                                        comment     : count[0].count + " Contacts found",
                                        search_query  : req.query.search});
                
            });
        });
    }
});

app.get("/addpage", function(req, res){
    //console.log(req.body);
    if (typeof req.query.edit === "undefined"){
        res.render("add_contact");
    }
    else{
        let q = req.query.edit;
        let sql = "SELECT * from contact where contact_id=" + q;
        let sql2 = "SELECT * from address where contact_id=" + q;
        let sql3 = "SELECT * from phone where contact_id=" + q;
        let sql4 = "SELECT * from date where contact_id=" + q;
        db.query(sql, function (err, contact_name){
            if (err) console.log(err);
            db.query(sql2, function (err, address){
                if (err) console.log(err);
                db.query(sql3, function (err, phone){
                    if (err) console.log(err);
                    db.query(sql4, function (err, date){
                        if (err) console.log(err);
                        // console.log(contact_name);
                        // console.log(address);
                        // console.log(phone);
                        date.forEach(function(entry) {
                            entry.date = entry.date.toISOString().split('T')[0];
                        });
                        console.log(date);
                        res.render("edit_contact", {contact_id : q,
                             contact_name : contact_name[0], address:address, phone:phone, date:date});
                    });
                });
            });
        });
    }
});

function executeQuery (query) {
    return new Promise(function(resolve, reject) {
        db.query(query, function(err, result) {
            if (err) {return reject(err)}
            return resolve(result)
        })
    })
}

app.post("/edit/:id", function(req, res){
    console.log(req.body);
    var contact_id = req.params.id;
    console.log("edit route : " + contact_id);

    var query_array = [];
    var promise_array = [];
    var update_contact = "UPDATE contact "+
    "SET fname = " + "'" + req.body.fname + "'" + 
    " , mname = " + "'" + req.body.mname + "'" + 
    " , lname = " + "'" + req.body.lname + "'" + 
    " where contact_id=" + contact_id;
    query_array.push(update_contact);

    console.log(req.body);

    if (req.body.address_delete !== undefined){
        for(let i = 0; i < req.body.address_delete.length ; i++){
            var delete_from_address = "DELETE FROM address WHERE address_id='" + req.body.address_delete[i] + "'";
            query_array.push(delete_from_address);
        }
    }

    if (req.body.phone_delete !== undefined){
        for(let i = 0; i < req.body.phone_delete.length ; i++){
            var delete_from_phone = "DELETE FROM phone WHERE phone_id='" + req.body.phone_delete[i] + "'";
            query_array.push(delete_from_phone);
        }
    }

    if (req.body.date_delete !== undefined){
        for(let i = 0; i < req.body.date_delete.length ; i++){
            var delete_from_date = "DELETE FROM date WHERE date_id='" + req.body.date_delete[i] + "'";
            query_array.push(delete_from_date);
        }
    }

    if (req.body.e_address !== undefined){
        for(let i = 0; i < req.body.e_address.length ; i++){
            let update_address = "UPDATE address "+
            "SET address_type = " + "'" + req.body.e_address[i].address_type + "'" + 
            " , address_line = " + "'" + req.body.e_address[i].address_line + "'" + 
            " , city = " + "'" + req.body.e_address[i].city + "'" +
            " , state = " + "'" + req.body.e_address[i].state + "'" +
            " , zip = " + "'" + req.body.e_address[i].zip + "'" +
            " where address_id=" + req.body.e_address[i].address_id;
            query_array.push(update_address);
        }
    }

    if (req.body.e_phone !== undefined){
        for(let i = 0; i < req.body.e_phone.length ; i++){
            var update_phone = "UPDATE phone "+
            "SET phone_type = " + "'" + req.body.e_phone[i].phone_type + "'" + 
            " , area_code = " + "'" + req.body.e_phone[i].phone.substring(0, 3) + "'" + 
            " , number = " + "'" + req.body.e_phone[i].phone.substring(3,10) + "'" + 
            " where phone_id=" + req.body.e_phone[i].phone_id;
            query_array.push(update_phone);
        }
    }

    if (req.body.e_event !== undefined){
        for(let i = 0; i < req.body.e_event.length ; i++){
            var update_date = "UPDATE date "+
            "SET date_type = " + "'" + req.body.e_event[i].date_type + "'" + 
            " , date = " + "'" + req.body.e_event[i].date + "'" + 
            " where date_id=" + req.body.e_event[i].date_id;
            query_array.push(update_date);
        }
    }

    if (req.body.address !== undefined){
        var add_address_insert = "INSERT INTO address (contact_id, address_type, address_line, city, state, zip) VALUES ?";
        var addressvalues = [];
        for(let i = 0; i < req.body.address.length ; i++){
            //if(req.body.address[i].address_type != ""){
                addressvalues.push([contact_id, req.body.address[i].address_type, req.body.address[i].address_line, req.body.address[i].city, req.body.address[i].state, req.body.address[i].zip]);
            //}
        }
        add_address = mysql.format(add_address_insert, [addressvalues]);
        query_array.push(add_address);
    }

    if (req.body.phone !== undefined){
        var add_phone_insert = "INSERT INTO phone (contact_id, phone_type, area_code, number) VALUES ?";
        var phonevalues = [];
        for(let i = 0; i < req.body.phone.length ; i++){
            //if(req.body.phone[i].phone_type != ""){
                phonevalues.push([contact_id, req.body.phone[i].phone_type, req.body.phone[i].phone.substring(0, 3), req.body.phone[i].phone.substring(3,10)]);
            //}
        }
        add_phone = mysql.format(add_phone_insert, [phonevalues]);
        query_array.push(add_phone);
    }

    if (req.body.event !== undefined){
        var add_date_insert = "INSERT INTO date (contact_id, date_type, date) VALUES ?";
        var datevalues = [];
        for(let i = 0; i < req.body.event.length ; i++){
            //if(req.body.event[i].date_type != ""){
                datevalues.push([contact_id, req.body.event[i].date_type, req.body.event[i].date]);
            //}
        }
        add_date = mysql.format(add_date_insert, [datevalues]);
        query_array.push(add_date);
    }
    console.log(query_array);

    promise_array = [];
    for(query of query_array){
        promise_array.push(executeQuery(query));
    }
    console.log(promise_array);
    
    Promise.all(promise_array)
    .then(data => {
        console.log("Query Results : ----------------------------- Modify");
        console.log(data);
        res.render("index", {search_result : null,
            comment : "Modified Contact with contact ID : " + contact_id,
            search_query  : ""});
        return data;
    });
});

app.post('/add', function(req, res){
    console.log(req.body);
    var query_array = [];
    var promise_array = [];
    var sql = "INSERT INTO contact (fname, mname, lname) VALUES ?";
    var values = [[req.body.fname, req.body.mname, req.body.lname]];

    db.query(sql, [values], function (err, result) {
        if (err) console.log(err);
        console.log("insertId " + result.insertId);

        if (req.body.address !== undefined){
            var add_address_insert = "INSERT INTO address (contact_id, address_type, address_line, city, state, zip) VALUES ?";
            var addressvalues = [];
            for(let i = 0; i < req.body.address.length ; i++){
                //if(req.body.address[i].address_type != ""){
                    addressvalues.push([result.insertId, req.body.address[i].address_type, req.body.address[i].address_line, req.body.address[i].city, req.body.address[i].state, req.body.address[i].zip]);
                //}
            }
            add_address = mysql.format(add_address_insert, [addressvalues]);
            query_array.push(add_address);
        }
    
        if (req.body.phone !== undefined){
            var add_phone_insert = "INSERT INTO phone (contact_id, phone_type, area_code, number) VALUES ?";
            var phonevalues = [];
            for(let i = 0; i < req.body.phone.length ; i++){
                //if(req.body.phone[i].phone_type != ""){
                    phonevalues.push([result.insertId, req.body.phone[i].phone_type, req.body.phone[i].phone.substring(0, 3), req.body.phone[i].phone.substring(3,10)]);
                //}
            }
            add_phone = mysql.format(add_phone_insert, [phonevalues]);
            query_array.push(add_phone);
        }
    
        if (req.body.event !== undefined){
            var add_date_insert = "INSERT INTO date (contact_id, date_type, date) VALUES ?";
            var datevalues = [];
            for(let i = 0; i < req.body.event.length ; i++){
                //if(req.body.event[i].date_type != ""){
                    datevalues.push([result.insertId, req.body.event[i].date_type, req.body.event[i].date]);
                //}
            }
            add_date = mysql.format(add_date_insert, [datevalues]);
            query_array.push(add_date);
        }
        
        console.log(query_array);
        promise_array = [];
        for(query of query_array){
            promise_array.push(executeQuery(query));
        }
        console.log(promise_array);
        Promise.all(promise_array)
        .then(data => {
            console.log("Query Results : ----------------------------- Insert");
            console.log(data);
            res.render("index", {search_result : null,
                comment : "New Contact Added with contact ID = " + result.insertId,
                search_query  : ""});
            return data;
        });
    });
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
                    res.render("index", {search_result : null,
                        comment : "Deleted Contact with contactID : " + id,
                        search_query  : ""});
                });
            });
        });
    });
    
});


app.listen(3000, "localhost", function(){
    console.log("Server started at 3000");
});