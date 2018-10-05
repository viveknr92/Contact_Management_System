$(document).ready(function (){
    addForm('#addAddress', '#address', '#cloneAddresshere', '#deleteAddress');
    addForm('#addPhone', '#phone', '#clonePhonehere', '#deletePhone');
    addForm('#addEvent', '#event', '#cloneEventhere', '#deleteEvent');

    $('#editButton').click(function(){
        console.log("Edit clicked" + $(this).val());
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