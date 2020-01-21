$(document).ready(function () {
    $('.form__proceed-button').on('click', function () {
        var parent_fieldset = $(this).parents('fieldset');
        var group_name = parent_fieldset.attr('data-fieldset-name');
        var parent_form = $(this).parents('form');
        parent_form.parsley().whenValidate({
            group: group_name,
            force: true
        }).done(function () {
            parent_fieldset.hide();
            parent_fieldset.next().show();
            var index = parent_fieldset.attr("data-index");
            $('.form__fieldset-count').find('span[data-index="' + (parseInt(index) + 1) + '"]').addClass('active');
            $("body, html").animate({ scrollTop: parent_form.offset().top - 20 });
        });
    });


    $('.form__back-button').on("click", function (e) {
        var parent_fieldset = $(this).parents('fieldset');
        var group_name = parent_fieldset.attr('data-fieldset-name');
        var parent_form = $(this).parents('form');
        e.preventDefault();
        parent_fieldset.hide();
        parent_fieldset.prev().show();
        var index = parent_fieldset.attr("data-index");
        $('.form__fieldset-count').find('span[data-index="' + parseInt(index) + '"]').removeClass('active');
        $("body, html").animate({ scrollTop: parent_form.offset().top - 20 });
    });

    $('.form__submit-button').on('click', function (e) {
        e.preventDefault();
        var parent_fieldset = $(this).parents('fieldset');
        var group_name = parent_fieldset.attr('data-fieldset-name');
        var parent_form = $(this).parents('form');
        parent_form.parsley().whenValidate({
            group: group_name,
            force: true
        }).done(function () {
            if (parent_form.hasClass('form--personal-info')) {
                var html = '<h3>Thank you for submitting your details</h3>';
                html += '<p>Someone will be in touch shortly to discuss your claim</p>';
                parent_form.html(html).addClass('form--completed');
                $("body, html").animate({ scrollTop: parent_form.offset().top - 20 });
            } else {
                var $modal = $("#modal");
                $modal.addClass('modal--active');
                $("body").addClass("modal-active");
                setTimeout(function () {
                    $modal.removeClass('modal--active');
                    $("body").removeClass("modal-active");
                    parent_form.hide();
                    $('.buyer-panel').show();
                }, 3000);
            }
        });
    });

    $("#request_callback").on("click", function (e) {
        e.preventDefault();
        $('.buyer-panel').hide();
        $('.form--personal-info').show();
    });
});