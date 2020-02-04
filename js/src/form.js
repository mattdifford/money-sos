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
                $.ajax({

                    async: true,
                    url: 'https://savvy.leadspediatrack.com/post.do',
                    data: parent_form.serializeObject(),
                    type: 'POST',
                    success: function (data) {
                        var response = data.all;
                        var nodes = [];
                        for (i = 0; i < response.length; i++) {
                            nodes[data.all[i].nodeName] = i;
                        }
                        var result_index = nodes["result"];
                        var error_index = nodes["error"];
                        if (response[result_index].innerHTML != 'failed') {
                            $.ajax({
                                type: "POST",
                                url: "https://prod-03.uksouth.logic.azure.com:443/workflows/4eb150b479614cd09dc24d18c8cfd03e/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=IhYaG8SQ2pgSNJysFtQJ7fm9sO1u5ULUyItiEIe9G6g",
                                async: true,
                                data: { "email": formData.email_address, "first_name": formData.first_name, "last_name": formData.last_name },
                                success: function () {
                                    var html = '<h3>Thank you for submitting your details</h3>';
                                    html += '<p>Someone will be in touch shortly to discuss your claim</p>';
                                    parent_form.html(html).addClass('form--completed');
                                    $("body, html").animate({ scrollTop: parent_form.offset().top - 20 });
                                }
                            });
                        } else {
                            var html = '<p class="form__message form__message--error">Something went wrong, please try again</p>';
                            parent_form.append(html);
                            $("body, html").animate({ scrollTop: parent_form.offset().top - 20 });
                        }

                    },
                    error: function (e) {
                        var html = '<p class="form__message form__message--error">Something went wrong, please try again</p>';
                        parent_form.append(html);
                        $("body, html").animate({ scrollTop: parent_form.offset().top - 20 });
                    }
                });

            } else {
                var $modal = $("#modal");
                $modal.addClass('modal--active');
                $("body").addClass("modal-active");
                setTimeout(function () {
                    $modal.removeClass('modal--active');
                    $("body").removeClass("modal-active");
                    parent_form.hide();
                    $('.header-image__bg, .header-image__left').hide();
                    $('.buyer-panel').show();
                    $('.header-image__right').addClass('has-buyer-panel');
                }, 3000);
            }
        });
    });

    $(".request_callback_button").on("click", function (e) {
        e.preventDefault();
        $('.buyer-panel').hide();
        $('.form--personal-info').show();
        $('.header-image__bg, .header-image__left').show();
        $('.header-image__right').removeClass('has-buyer-panel');
    });
});

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};