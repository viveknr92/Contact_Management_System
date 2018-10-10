var i = -1;


$(document).ready(function (){
    //addForm('#addAddress', '#address', '#cloneAddresshere', '#deleteAddress');
    //deleteForm('#address_existing', '#deleteAddress_existing', '#address_to_delete', "address");
    
    addForm('#addPhone', '#phone', '#clonePhonehere', '#deletePhone');
    deleteForm('#phone_existing', '#deletePhone_existing', '#phone_to_delete', "phone");
    
    //addForm('#addEvent', '#event', '#cloneEventhere', '#deleteEvent');
    //deleteForm('#event_existing', '#deleteEvent_existing', '#date_to_delete', "date");


    $("#formID").submit(function(e) {
        // e.preventDefault();
        // $(this).append('<input type="hidden" name="field_name" value="value" /> ');
        // console.log(e);
        // console.log($(this).closest('form').serialize());
        var phone = [];
        $('#clonePhonehere').children().each(function(e){
            console.log($(this).find('input')[0].value);
            console.log($(this).find('input')[1].value);
            // var temp = {
            //     'phone_type' : $(this).find('input')[0].value,
            //     'phone' : $(this).find('input')[1].value
            // };
            var temp = {};
            temp['phone_type'] = $(this).find('input')[0].value;
            temp['phone'] =  $(this).find('input')[1].value;
            // phone.push(JSON.stringify(temp));
            phone.push(temp);
            
            // console.log(JSON.stringify(temp));
        });

        console.log(JSON.stringify(phone));

        $('<input />').attr('type', 'hidden')
          .attr('name', "phone2")
          .attr('value', JSON.stringify(phone))
          .appendTo('#formID');

        console.log($(this).closest('form').serialize());
        
        return true;
    });
    
});
function addForm(AddbuttonID, formID, cloneHereID, DeletebuttonID){
    $(document).on('click', AddbuttonID, function () {
        i += 1;
        var phone_var = `<div id='phone' class='form-group' style='display:none'>\
            <div class='form-row'>\
                <div class='form-group col-md-3'>\
                    <input list='PhoneType' name='phone[${i}][phone_type]' class='form-control'>\
                    <datalist id='PhoneType'>\
                        <option value='home'>\
                        <option value='work'>\
                    </datalist>\
                </div>\
                <div class='form-group col-md-6'>\
                    <input type='tel' class='form-control' id='inputPhone' name='phone[${i}][phone]' placeholder='Phone'>\
                </div>\
                <div class='form-group col-md-1'>\
                    <button type='button' class='btn btn-danger' id='deletePhone'> X </button>\
                </div>\
            </div>\
        </div>`;
        $(phone_var).appendTo(cloneHereID).show();

        // $('#phone:last input').each(function() {
        //     //console.log($(this).val());
        //     var input = $(this).attr("name");
        //     //console.log($(this).attr("name"));
        //     var output = input.replace((i).toString(), i+1);
        //     $(this).attr("name", output);
        //     console.log('Value of i is ',i);
        //     console.log('Name ', $(this).attr("name"));
        // });
        
        //$(DeletebuttonID).off();

        $(document).on('click', DeletebuttonID, function () {
            console.log($(this));
            $(this).parents(formID).remove();

        });
    });
}

function deleteForm( formID, DeletebuttonID, formToDelete, fieldset){
    
    //$(DeletebuttonID).off();
    // $(document).on('click', DeletebuttonID, function () {
    //     console.log($(this));
    //     $(formToDelete).after("<input type='hidden' name='" + fieldset + "_delete[]' value='" + $(this).val() + "'/>");
    //     $(this).parents(formID).remove();
    // });
}