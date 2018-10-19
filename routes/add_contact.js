var mysql = require('mysql');

exports.addpage = function(req, res){
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
}

exports.add_contact = function(req, res){
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
}

function executeQuery (query) {
    return new Promise(function(resolve, reject) {
        db.query(query, function(err, result) {
            if (err) {return reject(err)}
            return resolve(result)
        })
    })
}