$(document).ready(function (){
    addForm('#addAddress', '#address', '#cloneAddresshere', '#deleteAddress');
    deleteForm('#address_existing', '#deleteAddress');
    
    addForm('#addPhone', '#phone', '#clonePhonehere', '#deletePhone');
    deleteForm('#phone_existing', '#deletePhone');
    
    addForm('#addEvent', '#event', '#cloneEventhere', '#deleteEvent');
    deleteForm('#event_existing', '#deleteEvent');

    $('#editButton').click(function(){
        console.log("Edit clicked" + $(this).val());
    });
});

function addForm(AddbuttonID, formID, cloneHereID, DeletebuttonID){
    $(document).on('click', AddbuttonID, function () {
        $(formID).clone().appendTo(cloneHereID).show();
        
        //$(DeletebuttonID).off();
        $(document).on('click', DeletebuttonID, function () {
            $(this).parents(formID).remove();
        });
    });
}

function deleteForm( formID, DeletebuttonID){
        //$(DeletebuttonID).off();
        $(document).on('click', DeletebuttonID, function () {
            $(this).parents(formID).remove();
        });
}