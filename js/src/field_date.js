$(document).ready(function () {
    if (window.screen.width >= 1260) {
        var isShift = false;
        var separator = "/";
        var inputs = $('.field__input--date');
        inputs.on("keydown", function (e) {
            return IsNumeric(this, e.keyCode);
        })

        //Validate Date as user types.
        inputs.on("keyup", function (e) {
            ValidateDateFormat(this, e.keyCode, false);
        })
        //Validate Date fully when user blurs input.
        inputs.on("blur", function (e) {
            ValidateDateFormat(this, e.keyCode, true);
        })

        function IsNumeric(input, keyCode) {
            if (keyCode == 16) {
                isShift = true;
            }
            //Allow only Numeric Keys.
            if (((keyCode >= 48 && keyCode <= 57) || keyCode == 8 || keyCode <= 37 || keyCode <= 39 || (keyCode >= 96 && keyCode <= 105)) && isShift == false) {


                return true;
            }
            else {
                return false;
            }
        };

        function ValidateDateFormat(input, keyCode, show_error) {
            if (typeof show_error === "undefined") {
                show_error = false
            }
            var dateString = input.value;
            if (keyCode == 16) {
                isShift = false;
            }
            if ((input.value.length == 2 || input.value.length == 5) && keyCode != 8) {
                input.value += separator;
            }
            var regex = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/;


            //Check whether valid dd/mm/yyyy Date Format.
            if (regex.test(dateString) || dateString.length == 0) {
                ShowHideError(input, "none");
            } else {
                if (show_error) {
                    ShowHideError(input, "block");
                }
            }
        };

        function ShowHideError(textbox, display) {
            var row = textbox.parentNode.parentNode;
            var errorMsg = row.getElementsByTagName("span")[0];
            if (errorMsg != null) {
                errorMsg.style.display = display;
            }
        };
    } else {
        $('.field__input--date').prop('type', 'date')
    }
})

