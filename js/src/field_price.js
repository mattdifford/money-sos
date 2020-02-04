$(".field__input--price").on("keyup", function () {
    var n = parseInt($(this).val().replace(/\D/g, ''), 10);
    if (n.toLocaleString() != "NaN") {
        $(this).val(n.toLocaleString());
    }
});