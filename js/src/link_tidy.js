var current_url = window.location.protocol + '//' + window.location.hostname;
$('a').each(function(){
    if ($(this).attr("href").indexOf(current_url) == -1){
        $(this).attr("rel", "external noopener")
        $(this).attr("target", "_blank")
    }
})