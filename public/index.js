var phone_var = `<div id='phone' class='form-group' style='display:none'>\
            <div class='form-row'>\
                <div class='form-group col-md-3'>\
                    <input list='PhoneType' name='phone[][phone_type]' class='form-control'>\
                    <datalist id='PhoneType'>\
                        <option value='home'>\
                        <option value='work'>\
                    </datalist>\
                </div>\
                <div class='form-group col-md-6'>\
                    <input type='tel' class='form-control' id='inputPhone' name='phone[][phone]' placeholder='Phone'>\
                </div>\
                <div class='form-group col-md-1'>\
                    <button type='button' class='btn btn-danger' id='deletePhone'> X </button>\
                </div>\
            </div>\
        </div>`;

var phone_var = `<div id='phone' class='form-group' style='display:none'>\
            <div class='form-row'>\
                <div class='form-group col-md-3'>\
                    <input list='PhoneType' name='phone[][phone_type]' class='form-control'>\
                    <datalist id='PhoneType'>\
                        <option value='home'>\
                        <option value='work'>\
                    </datalist>\
                </div>\
                <div class='form-group col-md-6'>\
                    <input type='tel' class='form-control' id='inputPhone' name='phone[][phone]' placeholder='Phone'>\
                </div>\
                <div class='form-group col-md-1'>\
                    <button type='button' class='btn btn-danger' id='deletePhone'> X </button>\
                </div>\
            </div>\
        </div>`;

var phone_var = `<div id='phone' class='form-group' style='display:none'>\
            <div class='form-row'>\
                <div class='form-group col-md-3'>\
                    <input list='PhoneType' name='phone[][phone_type]' class='form-control'>\
                    <datalist id='PhoneType'>\
                        <option value='home'>\
                        <option value='work'>\
                    </datalist>\
                </div>\
                <div class='form-group col-md-6'>\
                    <input type='tel' class='form-control' id='inputPhone' name='phone[][phone]' placeholder='Phone'>\
                </div>\
                <div class='form-group col-md-1'>\
                    <button type='button' class='btn btn-danger' id='deletePhone'> X </button>\
                </div>\
            </div>\
        </div>`;

$(document).ready(function (){
    //addForm('#addAddress', '#address', '#cloneAddresshere', '#deleteAddress');
    //deleteForm('#address_existing', '#deleteAddress_existing', '#address_to_delete', "address");
    
    addForm('#addPhone', '#phone', '#clonePhonehere', '#deletePhone');
    deleteForm('#phone_existing', '#deletePhone_existing', '#phone_to_delete', "phone");
    
    //addForm('#addEvent', '#event', '#cloneEventhere', '#deleteEvent');
    //deleteForm('#event_existing', '#deleteEvent_existing', '#date_to_delete', "date");


    $("#formID").submit(function(e) {
        //e.preventDefault();
        $('#clonePhonehere').children().each(function(e){
            console.log($(this).find('input')[0].name);
            console.log($(this).find('input')[1].name);
            
            $(this).find('input')[0].name = "phone[" + e + "][phone_type]";
            $(this).find('input')[1].name = "phone[" + e + "][phone]";

            console.log($(this).find('input')[0].name);
            console.log($(this).find('input')[1].name);
        });

        console.log($(this).closest('form').serialize());
        
        return true;
    });
    
});
function addForm(AddbuttonID, formID, cloneHereID, DeletebuttonID){
    $(document).on('click', AddbuttonID, function () {
        
        $(phone_var).appendTo(cloneHereID).show();
        $(document).on('click', DeletebuttonID, function () {
            console.log($(this));
            $(this).parents(formID).remove();

        });
    });
}

function deleteForm( formID, DeletebuttonID, formToDelete, fieldset){
    $(DeletebuttonID).off();
    $(document).on('click', DeletebuttonID, function () {
        console.log($(this));
        $(formToDelete).after("<input type='hidden' name='" + fieldset + "_delete[]' value='" + $(this).val() + "'/>");
        $(this).parents(formID).remove();
    });
}