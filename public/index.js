var phone = `<div id='phone' class='form-group' style='display:none'>\
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
var address = `<div id='address' class='form-group' style='display:none'>
<div class='form-row'>
    <div class='form-group col-md-3'>
        <input list='addressType' name='address[][address_type]' class='form-control'>
        <datalist id='addressType'>
            <option value='home'>
            <option value='work'>
        </datalist>
    </div>
    <div class='form-group col-md-8'>
        <input type='text' class='form-control' id='inputAddress' name='address[][address_line]' placeholder='Address'>
    </div>
    <div class='form-group col-md-1'>
        <button type='button' class='btn btn-danger' id='deleteAddress'> X </button>
    </div>
</div>
<div class='form-row'>
    <div class='form-group col-md-5'>
        <input type='text' class='form-control' placeholder='City' id='inputCity' name='address[][city]'>
    </div>
    <div class='form-group col-md-4'>
        <input type='text' class='form-control' placeholder='State' id='inputState' name='address[][state]'>
    </div>
    <div class='form-group col-md-2'>
        <input type='text' class='form-control' placeholder='Zip' id='inputZip' name='address[][zip]'>
    </div>
</div>
</div><!-- Address -->`;

var event = `<div id='event' class='form-group' style='display:none'>
<div class='form-row'>
    <div class='form-group col-md-3'>
        <input list='EventType' name='event[][date_type]' class='form-control'>
        <datalist id='EventType'>
            <option value='home'>
            <option value='work'>
        </datalist>
    </div>
    <div class='form-group col-md-6'>
        <input type='date' class='form-control' id='inputEvent' placeholder='MM-DD-YYYY' name='event[][date]'>
    </div>
    <div class='form-group col-md-1'>
        <button type='button' class='btn btn-danger' id='deleteEvent'> X </button>
    </div>
</div>
</div> <!-- Event -->`;

function addForm(AddbuttonID, formID, cloneHereID, DeletebuttonID){
    $(document).on('click', AddbuttonID, function () {
        $(formID).appendTo(cloneHereID).show();
        $(document).on('click', DeletebuttonID, function () {
            console.log($(this));
            $(this).parentsUntil(cloneHereID).remove();

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
$(document).ready(function (){
    addForm('#addAddress', address , '#cloneAddresshere', '#deleteAddress');
    deleteForm('#address_existing', '#deleteAddress_existing', '#address_to_delete', "address");
    
    addForm('#addPhone', phone , '#clonePhonehere', '#deletePhone');
    deleteForm('#phone_existing', '#deletePhone_existing', '#phone_to_delete', "phone");
    
    addForm('#addEvent', event , '#cloneEventhere', '#deleteEvent');
    deleteForm('#event_existing', '#deleteEvent_existing', '#date_to_delete', "date");


    $("#formID").submit(function(e) {
        //e.preventDefault();
        $('#clonePhonehere').children().each(function(e){
            $(this).find('input')[0].name = "phone[" + e + "][phone_type]";
            $(this).find('input')[1].name = "phone[" + e + "][phone]";

            console.log($(this).find('input')[0].name + " = " + $(this).find('input')[0].value);
            console.log($(this).find('input')[1].name + " = " + $(this).find('input')[1].value);
            console.log(" ");
        });

        $('#cloneAddresshere').children().each(function(e){
            
            $(this).find('input')[0].name = "address[" + e + "][address_type]";
            $(this).find('input')[1].name = "address[" + e + "][address_line]";
            $(this).find('input')[2].name = "address[" + e + "][city]";
            $(this).find('input')[3].name = "address[" + e + "][state]";
            $(this).find('input')[4].name = "address[" + e + "][zip]";

            console.log($(this).find('input')[0].name + " = " + $(this).find('input')[0].value);
            console.log($(this).find('input')[1].name + " = " + $(this).find('input')[1].value);
            console.log($(this).find('input')[2].name + " = " + $(this).find('input')[2].value);
            console.log($(this).find('input')[3].name + " = " + $(this).find('input')[3].value);
            console.log($(this).find('input')[4].name + " = " + $(this).find('input')[4].value);
            console.log(" ");
        });

        $('#cloneEventhere').children().each(function(e){
    
            $(this).find('input')[0].name = "event[" + e + "][date_type]";
            $(this).find('input')[1].name = "event[" + e + "][date]";

            console.log($(this).find('input')[0].name + " = " + $(this).find('input')[0].value);
            console.log($(this).find('input')[1].name + " = " + $(this).find('input')[1].value);
            console.log(" ");
        });



        ///////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////

        $('#existingPhonehere').children().each(function(e){
            $(this).find('input')[0].name = "e_phone[" + e + "][phone_type]";
            $(this).find('input')[1].name = "e_phone[" + e + "][phone]";
            $(this).find('input')[2].name = "e_phone[" + e + "][phone_id]";

            console.log($(this).find('input')[0].name + " = " + $(this).find('input')[0].value);
            console.log($(this).find('input')[1].name + " = " + $(this).find('input')[1].value);
            console.log($(this).find('input')[2].name + " = " + $(this).find('input')[2].value);
            console.log(" ");
        });

        $('#existingAddresshere').children().each(function(e){
            
            $(this).find('input')[0].name = "e_address[" + e + "][address_type]";
            $(this).find('input')[1].name = "e_address[" + e + "][address_line]";
            $(this).find('input')[2].name = "e_address[" + e + "][city]";
            $(this).find('input')[3].name = "e_address[" + e + "][state]";
            $(this).find('input')[4].name = "e_address[" + e + "][zip]";
            $(this).find('input')[5].name = "e_address[" + e + "][address_id]";
            

            console.log($(this).find('input')[0].name + " = " + $(this).find('input')[0].value);
            console.log($(this).find('input')[1].name + " = " + $(this).find('input')[1].value);
            console.log($(this).find('input')[2].name + " = " + $(this).find('input')[2].value);
            console.log($(this).find('input')[3].name + " = " + $(this).find('input')[3].value);
            console.log($(this).find('input')[4].name + " = " + $(this).find('input')[4].value);
            console.log($(this).find('input')[5].name + " = " + $(this).find('input')[5].value);
            console.log(" ");
        });

        $('#existingEventhere').children().each(function(e){
    
            $(this).find('input')[0].name = "e_event[" + e + "][date_type]";
            $(this).find('input')[1].name = "e_event[" + e + "][date]";
            $(this).find('input')[2].name = "e_event[" + e + "][date_id]";

            console.log($(this).find('input')[0].name + " = " + $(this).find('input')[0].value);
            console.log($(this).find('input')[1].name + " = " + $(this).find('input')[1].value);
            console.log($(this).find('input')[2].name + " = " + $(this).find('input')[2].value);
            console.log(" ");
        });

        console.log($(this).closest('form').serializeArray());
        
        //return false;
        return true;
    });
    
});
