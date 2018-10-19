exports.delete_contact = function(req, res){
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
}