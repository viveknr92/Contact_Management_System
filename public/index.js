$(document).ready(function (){
    
    
var phone = "<div id='phone' class='form-group'>\
    <div class='form-row'>\
        <div class='form-group col-md-3'>\
            <input list='PhoneType' name='phone[" + phone_i + "][phone_type]' class='form-control'>\
            <datalist id='PhoneType'>\
                <option value='home'>\
                <option value='work'>\
            </datalist>\
        </div>\
        <div class='form-group col-md-6'>\
            <input type='tel' class='form-control' id='inputPhone' name='phone[" + phone_i + "][phone]' placeholder='Phone'>\
        </div>\
        <div class='form-group col-md-1'>\
            <button type='button' class='btn btn-danger' id='deletePhone'> X </button>\
        </div>\
    </div>\
</div>";

var event = "<div id='event' class='form-group'>\
    <div class='form-row'>\
        <div class='form-group col-md-3'>\
            <input list='EventType' name='event[" + event_i + "][date_type]' class='form-control'>\
            <datalist id='EventType'>\
                <option value='home'>\
                <option value='work'>\
            </datalist>\
        </div>\
        <div class='form-group col-md-6'>\
            <input type='date' class='form-control' id='inputEvent' placeholder='MM-DD-YYYY' name='event[" + event_i + "][date]'>\
        </div>\
        <div class='form-group col-md-1'>\
            <button type='button' class='btn btn-danger' id='deleteEvent'> X </button>\
        </div>\
    </div>\
</div>";
var address_i = 0;
var phone_i = 0;
var event_i = 0;
    addForm('#addAddress', address, '#cloneAddresshere', '#deleteAddress', '#address', address_i);
    deleteForm('#address_existing', '#deleteAddress_existing', '#address_to_delete', 'address');
    
    addForm('#addPhone', phone, '#clonePhonehere', '#deletePhone', '#phone' );
    deleteForm('#phone_existing', '#deletePhone_existing', '#phone_to_delete', 'phone');
    
    addForm('#addEvent', event, '#cloneEventhere', '#deleteEvent', '#event');
    deleteForm('#event_existing', '#deleteEvent_existing', '#date_to_delete', 'date');


    $('#formID').submit(function(e) {
        console.log($(this).closest('form').serialize());
    });
});

function addForm(AddbuttonID, formID, cloneHereID, DeletebuttonID, formIDname, address_i){
    $(document).on('click', AddbuttonID, function () {
        address = address_var(address_i);
        console.log(address);
        address_i = address_i + 1;
        //$(formID).clone().appendTo(cloneHereID).show();
        $(address).appendTo(cloneHereID).show();
        //$(DeletebuttonID).off();
        $(document).on('click', DeletebuttonID, function (address_i) {
            $(this).parents(formIDname).remove();
        });
    });
    return address_i;
}

function deleteForm( formID, DeletebuttonID, formToDelete, fieldset){
    
    //$(DeletebuttonID).off();
    $(document).on('click', DeletebuttonID, function () {
        console.log($(this).val());
        $(formToDelete).after("<input type='hidden' name='" + fieldset + "'_delete[]' value='" + $(this).val() + "/>");
        $(this).parents(formID).remove();
    });
}

function address_var(address_i){
    var address ="<div id='address' class='form-group'> \
<div class='form-row'> \
    <div class='form-group col-md-3'> \
        <input list='addressType' name='address[" + address_i + "][address_type]' class='form-control'>\
        <datalist id='addressType'>\
            <option value='home'>\
            <option value='work'>\
        </datalist>\
    </div>\
    <div class='form-group col-md-8'>\
        <input type='text' class='form-control' id='inputAddress' name='address[" + address_i + "][address_line]' placeholder='Address'\
            value=''>\
    </div>\
    <div class='form-group col-md-1'>\
        <button type='button' class='btn btn-danger' id='deleteAddress'> X </button>\
    </div>\
</div>\
<div class='form-row'>\
    <div class='form-group col-md-5'>\
        <input type='text' class='form-control' placeholder='City' id='inputCity' name='address[" + address_i + "][city]'>\
    </div>\
    <div class='form-group col-md-4'>\
        <input type='text' class='form-control' placeholder='State' id='inputState' name='address[" + address_i + "][state]'>\
    </div>\
    <div class='form-group col-md-2'>\
        <input type='text' class='form-control' placeholder='Zip' id='inputZip' name='address[" + address_i + "][zip]'>\
    </div>\
</div>\
</div>";
return address;
}