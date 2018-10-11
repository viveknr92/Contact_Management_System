var phone = `<div id='phone' class='form-group' style='display:none'>\
            <div class='form-row'>\
                <div class='form-group col-md-3'>\
                    <input list='PhoneType' name='phone[][phone_type]' class='form-control' placeholder='Type'>\
                    <div class="invalid-feedback">phone type - alphanumeric (max len = 10)</div>
                    <datalist id='PhoneType'>\
                        <option value='home'>\
                        <option value='work'>\
                    </datalist>\
                </div>\
                <div class='form-group col-md-6'>\
                    <input type='tel' class='form-control' id='inputPhone' name='phone[][phone]' placeholder='Phone'>\
                    <div class="invalid-feedback">phone - 10 digits</div>
                </div>\
                <div class='form-group col-md-1'>\
                    <button type='button' class='btn btn-danger' id='deletePhone'> X </button>\
                </div>\
            </div>\
        </div>`;
var address = `<div id='address' class='form-group' style='display:none'>
<div class='form-row'>
    <div class='form-group col-md-3'>
        <input list='addressType' name='address[][address_type]' class='form-control' placeholder='Type'>
        <div class="invalid-feedback">address type - alphanumeric (max len = 10)</div>
        <datalist id='addressType'>
            <option value='home'>
            <option value='work'>
        </datalist>
    </div>
    <div class='form-group col-md-8'>
        <input type='text' class='form-control' id='inputAddress' name='address[][address_line]' placeholder='Address'>
        <div class="invalid-feedback">address line - max len = 100</div>
    </div>
    <div class='form-group col-md-1'>
        <button type='button' class='btn btn-danger' id='deleteAddress'> X </button>
    </div>
</div>
<div class='form-row'>
    <div class='form-group col-md-5'>
        <input type='text' class='form-control' placeholder='City' id='inputCity' name='address[][city]'>
        <div class="invalid-feedback">city - alphanumeric (max len = 20)</div>
    </div>
    <div class='form-group col-md-4'>
        <input type='text' class='form-control' placeholder='State' id='inputState' name='address[][state]'>
        <div class="invalid-feedback">state - alphanumeric (max len = 20)</div>
    </div>
    <div class='form-group col-md-2'>
        <input type='text' class='form-control' placeholder='Zip' id='inputZip' name='address[][zip]'>
        <div class="invalid-feedback">zip code - 5 or 6 digits</div>
    </div>
</div>
</div><!-- Address -->`;

var event = `<div id='event' class='form-group' style='display:none'>
<div class='form-row'>
    <div class='form-group col-md-3'>
        <input list='EventType' name='event[][date_type]' class='form-control' placeholder='Type'>
        <div class="invalid-feedback">event type - alphanumeric (max len = 10)</div>
        <datalist id='EventType'>
            <option value='home'>
            <option value='work'>
        </datalist>
    </div>
    <div class='form-group col-md-6'>
        <input type='date' class='form-control' id='inputEvent' placeholder='MM-DD-YYYY' name='event[][date]'>
        <div class="invalid-feedback">Please choose a date for this event</div>
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
    $('#confirm-delete').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
    });

    addForm('#addAddress', address , '#cloneAddresshere', '#deleteAddress');
    deleteForm('#address_existing', '#deleteAddress_existing', '#address_to_delete', "address");
    
    addForm('#addPhone', phone , '#clonePhonehere', '#deletePhone');
    deleteForm('#phone_existing', '#deletePhone_existing', '#phone_to_delete', "phone");
    
    addForm('#addEvent', event , '#cloneEventhere', '#deleteEvent');
    deleteForm('#event_existing', '#deleteEvent_existing', '#date_to_delete', "date");

    

    $("#formID").submit(function(event) {
        var flag = true;

        var name_regex = new RegExp(/^\w{1,20}$/); // alphanumeric name, city , state
        var type_regex = new RegExp(/^\w{1,10}$/); // alphanumeric type
        var address_line_regex = new RegExp(/^.{1,100}$/); // address line format
        var zip_regex = new RegExp(/^\d{5,6}$/); // zip format
        var phone_regex = new RegExp(/^\d{10}$/); // phone format

        function validate_date(inp){
            console.log($(inp).val());
            if($(inp).val() != ""){
                $(inp).removeClass("is-invalid");
                $(inp).addClass("is-valid");
                console.log($(inp).val() + "valid");
                return true;
            }
            else{
                $(inp).removeClass("is-valid");
                $(inp).addClass("is-invalid");
                console.log($(inp).val() + "invalid");
                event.preventDefault();
                return false;
            }
        }
     
        function validate(inp, regex){
            console.log($(inp).val());
            if(regex.test($(inp).val())){
                $(inp).removeClass("is-invalid");
                $(inp).addClass("is-valid");
                console.log($(inp).val() + "valid");
                return true;
            }
            else{
                $(inp).removeClass("is-valid");
                $(inp).addClass("is-invalid");
                console.log($(inp).val() + "invalid");
                event.preventDefault();
                return false;
            }
        }

        flag = validate("#fname", name_regex);
        flag = validate("#mname", name_regex);
        flag = validate("#lname", name_regex);

        $('#clonePhonehere').children().each(function(e){
            let input = $(this).find('input');
            input[0].name = "phone[" + e + "][phone_type]";
            input[1].name = "phone[" + e + "][phone]";

            console.log(input[0].name + " = " + input[0].value);
            console.log(input[1].name + " = " + input[1].value);
            
            flag = validate(input[0], type_regex);
            flag = validate(input[1], phone_regex);
            console.log(" ");
        });

        $('#cloneAddresshere').children().each(function(e){
            let input = $(this).find('input');
            input[0].name = "address[" + e + "][address_type]";
            input[1].name = "address[" + e + "][address_line]";
            input[2].name = "address[" + e + "][city]";
            input[3].name = "address[" + e + "][state]";
            input[4].name = "address[" + e + "][zip]";

            console.log(input[0].name + " = " + input[0].value);
            console.log(input[1].name + " = " + input[1].value);
            console.log(input[2].name + " = " + input[2].value);
            console.log(input[3].name + " = " + input[3].value);
            console.log(input[4].name + " = " + input[4].value);
            
            flag = validate(input[0], type_regex);
            flag = validate(input[1], address_line_regex);
            flag = validate(input[2], name_regex);
            flag = validate(input[3], name_regex);
            flag = validate(input[4], zip_regex);

            console.log(" ");
        });

        $('#cloneEventhere').children().each(function(e){
            let input = $(this).find('input');
            input[0].name = "event[" + e + "][date_type]";
            input[1].name = "event[" + e + "][date]";

            console.log(input[0].name + " = " + input[0].value);
            console.log(input[1].name + " = " + input[1].value);
            console.log(" ");
            flag = validate(input[0], type_regex);
            flag = validate_date(input[1]);

        });



        ///////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////

        $('#existingPhonehere').children().each(function(e){
            let input = $(this).find('input');
            input[0].name = "e_phone[" + e + "][phone_type]";
            input[1].name = "e_phone[" + e + "][phone]";
            input[2].name = "e_phone[" + e + "][phone_id]";

            console.log(input[0].name + " = " + input[0].value);
            console.log(input[1].name + " = " + input[1].value);
            console.log(input[2].name + " = " + input[2].value);

            flag = validate(input[0], type_regex);
            flag = validate(input[1], phone_regex);

            console.log(" ");
        });

        $('#existingAddresshere').children().each(function(e){
            let input = $(this).find('input');
            input[0].name = "e_address[" + e + "][address_type]";
            input[1].name = "e_address[" + e + "][address_line]";
            input[2].name = "e_address[" + e + "][city]";
            input[3].name = "e_address[" + e + "][state]";
            input[4].name = "e_address[" + e + "][zip]";
            input[5].name = "e_address[" + e + "][address_id]";
            

            console.log(input[0].name + " = " + input[0].value);
            console.log(input[1].name + " = " + input[1].value);
            console.log(input[2].name + " = " + input[2].value);
            console.log(input[3].name + " = " + input[3].value);
            console.log(input[4].name + " = " + input[4].value);
            console.log(input[5].name + " = " + input[5].value);

            flag = validate(input[0], type_regex);
            flag = validate(input[1], address_line_regex);
            flag = validate(input[2], name_regex);
            flag = validate(input[3], name_regex);
            flag = validate(input[4], zip_regex);

            console.log(" ");
        });

        $('#existingEventhere').children().each(function(e){
            let input = $(this).find('input');
            input[0].name = "e_event[" + e + "][date_type]";
            input[1].name = "e_event[" + e + "][date]";
            input[2].name = "e_event[" + e + "][date_id]";

            console.log(input[0].name + " = " + input[0].value);
            console.log(input[1].name + " = " + input[1].value);
            console.log(input[2].name + " = " + input[2].value);

            flag = validate(input[0], type_regex);
            flag = validate_date(input[1]);
            console.log(" ");
        });

        console.log($(this).closest('form').serializeArray());
        if (flag){
            return true;
        }
        else{
            event.preventDefault();
            return false;
        }
    });
    
});
