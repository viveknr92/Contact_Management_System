var mysql = require('mysql');

exports.update_contact = function(req, res){
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
}

function executeQuery (query) {
    return new Promise(function(resolve, reject) {
        db.query(query, function(err, result) {
            if (err) {return reject(err)}
            return resolve(result)
        })
    })
}