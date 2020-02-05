var current_url = window.location.protocol + '//' + window.location.hostname;
$('a').each(function(){
    var href = $(this).attr("href");
    if (href.charAt(0) != '/' && href.substr(0, 7) != 'mailto:' && href.indexOf(current_url) == -1){
        $(this).attr("rel", "external noopener")
        $(this).attr("target", "_blank")
    }
})