$(document).ready(function (){
    addForm('#addAddress', '#address', '#cloneAddresshere', '#deleteAddress');
    deleteForm('#address_existing', '#deleteAddress_existing', '#address_to_delete', "address");
    
    addForm('#addPhone', '#phone', '#clonePhonehere', '#deletePhone');
    deleteForm('#phone_existing', '#deletePhone_existing', '#phone_to_delete', "phone");
    
    addForm('#addEvent', '#event', '#cloneEventhere', '#deleteEvent');
    deleteForm('#event_existing', '#deleteEvent_existing', '#date_to_delete', "date");


    $("#formID").submit(function(e) {
        console.log($(this).closest('form').serialize());
        e.preventDefault();
    });
});

function addForm(AddbuttonID, formID, cloneHereID, DeletebuttonID){
    $(document).on('click', AddbuttonID, function () {
        $(formID).clone().appendTo(cloneHereID).show();
        
        //$(DeletebuttonID).off();
        $(document).on('click', DeletebuttonID, function () {
            console.log($(this).val());
            $(this).parents(formID).remove();
        });
    });
}

function deleteForm( formID, DeletebuttonID, formToDelete, fieldset){
    
    //$(DeletebuttonID).off();
    $(document).on('click', DeletebuttonID, function () {
        console.log($(this).val());
        $(formToDelete).after("<input type='hidden' name='" + fieldset + "_delete[]' value='" + $(this).val() + "'/>");
        $(this).parents(formID).remove();
    });
}