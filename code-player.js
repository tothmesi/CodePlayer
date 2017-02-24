var timer;

$(document).ready(function () {

    //menü gombok színezése
    $(".menu-item").click(function () {
        $(this).toggleClass("menu-item-clicked");
    });

    //aktív és inaktív ablakok megjelenítése, bezárása
    toggleWindow("#html-btn", "#html-text");
    toggleWindow("#css-btn", "#css-text");
    toggleWindow("#js-btn", "#js-text");
    toggleWindow("#output-btn", "#output-text");

    //html textarea kitöltése indításnál
    $.ajax("init.txt")
    .done(function (data) {

        $("#html-text textarea").val(data);
        //iframe frissítése
        giveTextToIframe();

    })
    .fail(function () {
        $("#html-text textarea").val("nemsikerült");
        //iframe frissítése
        giveTextToIframe();
    });


    $("#html-text textarea").on("change keyup paste", function () {
        giveTextToIframe();
    });

    $("#css-text textarea").on("change keyup paste", function () {
        giveTextToIframe();
    });

    $("#js-text textarea").on("change keyup paste", function () {
        giveTextToIframe();
    });



});

var toggleWindow = function(button, window) {
    $(button).click(function() {
        $(window).toggle("slow");
    });
}

var giveTextToIframe = function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
        var tempHTML = $("#html-text textarea").val();
        var tempCSS = $("#css-text textarea").val();
        var tempJS = $("#js-text textarea").val();
        $("iframe").attr("src", 'data:text/html;charset=utf-8,' + encodeURI("<style>" + tempCSS + "</style>" + tempHTML + "<script type='text/javascript'>" + tempJS + "</script>"));
        
    }, 800);
}


