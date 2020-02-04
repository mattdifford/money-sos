/**Array indices for getAddress API response**/
const LINE_1_INDEX = 0;
const LINE_2_INDEX = 1;
const TOWNCITY_INDEX = 5;
const COUNTY_INDEX = 6;
$('.field__lookup-button button').on("click", function () {
    var value = $(this).parents('.field__input-wrap').find('.field__input').val();
    var parent_form = $(this).parents('.form');
    parent_form.addClass('form--loading');
    $.get("https://api.getAddress.io/find/" + value.replace(/\s/g, ''), { 'api-key': "E6M9hcmutUGNSzoxzNdpRg22683", sort: true }, function (data, status) {
        var address_details = [];
        data.addresses.forEach(function (item) {
            address_details.push(item.split(","));
        });
        var html = '';
        html += '<div class="field__postcode-lookup-list postcode-lookup-list">';
        address_details.forEach(function (item) {
            var formatted_add = item.filter(function (el) {
                return el !== null && el !== ' ' && el !== '';
            });
            html += '<a class="postcode-lookup-list__item" href="#" data-line-1="' + item[LINE_1_INDEX] + '" data-line-2="' + item[LINE_2_INDEX] + '" data-town="' + item[TOWNCITY_INDEX] + '" data-county="' + item[COUNTY_INDEX] + '">' + formatted_add.join(', ') + '</a>';
        });
        html += '</div>';
        $('#{{results_id}}').append(html);
        parent_form.removeClass('form--loading');
    });
});

$("body").on("click", ".postcode-lookup-list__item", function (e) {
    var address_fields = $(this).parents('.form__field').find('.form__field');
    $(this).parents('.field__input-wrap').find('.field__lookup-button').remove();
    e.preventDefault();
    $('#{{results_id}}').html('');
    address_fields.show();
    $('input[name="{{-include.slug-}}-line1"]').val($(this).attr("data-line-1"));
    $('input[name="{{-include.slug-}}-line2"]').val($(this).attr("data-line-2"));
    $('input[name="{{-include.slug-}}-towncity"]').val($(this).attr("data-town"));
    $('input[name="{{-include.slug-}}-county"]').val($(this).attr("data-county"));
});