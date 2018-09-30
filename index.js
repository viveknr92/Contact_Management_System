$(document).ready(function (){
    addForm('#addAddress', '#address', '#cloneAddresshere', '#deleteAddress');
    addForm('#addPhone', '#phone', '#clonePhonehere', '#deletePhone');
    addForm('#addEvent', '#event', '#cloneEventhere', '#deleteEvent');

    $(searchbutton).click(function(){
        var str = $(searchValue).val();
        console.log("Str is " + str);
        if (str == "") {
            document.getElementById("txtHint").innerHTML = "";
            return;
        } 
        else { 
            xmlhttp = new XMLHttpRequest();
            console.log("object");
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("searchQuery").innerHTML = this.responseText;
                }
            };
            xmlhttp.open("GET","sample.php?q="+str,true);
            xmlhttp.send();
        }
    });

});

function addForm(AddbuttonID, formID, cloneHereID, DeletebuttonID){
    $(AddbuttonID).click(function(){
        $(formID).clone().appendTo(cloneHereID).show();
        
        //$(DeletebuttonID).off();
        $(document).on('click', DeletebuttonID, function () {
            $(this).parents(formID).remove();
        });
    });
}