const api_key = "PCWNW-9FSGT-69N88-H35WL";

function address_search(input_element, address_results, status_element, page) {
    $(address_results).empty();

    var page = page || 0;

    var address = $(input_element)
        .val()
        .trim();

    if (address != "") {
        if (page == 0) $(address_results).empty();

        var loading_html = $("<div></div>", {
            id: "address_loading",
            text: "Searching addresses...",
        });
        $(input_element).after(loading_html);

        $(status_element).text("Searching addresses");

        var country_code = "GB";

        var address_url =
            "https://ws.postcoder.com/pcw/" +
            api_key +
            "/address/" +
            country_code +
            "/" +
            encodeURIComponent(address) +
            "?lines=2&page=" +
            page;

        // Call the API
        $.ajax({
            url: address_url,
        }).done(function (data) {
            $("#address_loading").remove();
            // For only one result, simply populate the fields, rather than asking the user to select from list
            if (data.length == 1) {
                select_address(data[0], address_results, status_element);
                $(status_element).text('"' + data[0].summaryline + '" selected, address fields below populated');
            } else if (data.length > 1) {
                var select_element = $(
                    "<select name='address_select' id='address_select_element' class='field__input field__input--select postcode-address-select'></select>"
                );
                var select_label = $(
                    "<label for='address_select' class='field__label'>Choose an address</label>"
                );

                $(address_results)
                    .append(select_label)
                    .append(select_element);

                $("#address_select_element").on("change", function (event) {
                    if (event.target.value === "moreValues") {
                        // Here we handle a request for more addresses
                        // (if more than 100 were returned from the search)
                        address_search(input_element, address_results, status_element, data[data.length - 1].nextpage);
                    } else {
                        if (typeof gtag === 'function') {
                            gtag('event', $(input_element).attr("name"), { 'event_category': 'Form interaction', 'event_label': "Address select", });
                        }
                        $('.field--disabled').removeClass('field--disabled');
                        select_address(data[event.target.value], address_results, status_element);
                    }
                });

                for (var i = 0; i < data.length; i++) {
                    if (i === 0) {
                        var address_option = $("<option value='null'>Select an address...</option>");
                        $("#address_select_element").append(address_option);
                    }
                    var address_option = $("<option value='" + i + "'>" + data[i].summaryline + "</option>");
                    $("#address_select_element").append(address_option);
                }
                var last_index = data.length - 1;
                if (data[last_index].morevalues) {
                    var show_more_option = $("<option value='moreValues'>" + data[last_index].totalresults + " addresses found, click to show next 100</option>");
                    $("#address_select_element").append(show_more_option);
                } else {
                    $(status_element).text(data.length + " addresses found");
                }
            } else {
                $(address_results).text("No addresses found");
                $(status_element).text("No addresses found");
            }
        }).fail(function (error) {
            loading_html.remove();
            $(status_element).text("Error occurred");

            $(address_results).text("Error occurred");
        });
    } else {
        // Could show an "Address search term is required" message here
    }
}

function select_address(address, address_results, status_element) {
    
    if (address != null) {
        $(status_element).text('"' + address.summaryline + '" selected, address fields below populated');
        // Populate fields
        $("input[name='address']").val(address.addressline1);
        $("input[name='address2']").val(address.addressline2);
        $("input[name='city']").val(address.posttown);
        $("input[name='county']").val(address.posttown);
        $("input[name='zip_code']").val(address.postcode);
    } else {
        $("input[name='address']").val("");
        $("input[name='address2']").val("");
        $("input[name='county']").val("");
        $("input[name='zip_code']").val("");
    }
}

$('.field__lookup-button button').on("click", function (e) {
    e.preventDefault();
    address_search('.field__input--postcode', "#postcode_lookup_results", "#address_status");
});