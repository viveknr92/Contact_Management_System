exports.search = function(req, res){
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
}