var flickrKey = "0c74aabb810c286e7cb95d06496650f2",
    tags = "bicycle,bicycles,mountainbike",
    flickrCount = 3,
    flickrSize = "_z",
    flickrApiLink =
    "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + flickrKey + "&format=json&tags=" + tags + "&jsoncallback=?&per_page=" + flickrCount,
    winWidth = $(window).width(),
    desktopBreak = 960;


function renderTemplate(scriptID, whereTo, data) {
    var template = _.template($("#" + scriptID).text());
    $(whereTo).append(template(data));
}

/* ----------------------------------
    AJAX call to get photos from Flickr API
-------------------------------------*/
$.ajax({
    url: flickrApiLink,
    type: "GET",
    dataType: "json"
}).done(function(photoData) {
    _.each(photoData.photos.photo, function(img) {
        var link = {
            flickrLink: "https://farm" + img.farm + ".staticflickr.com/" + img.server + "/" + img.id + "_" + img.secret + flickrSize + ".jpg"
        };
        renderTemplate("template-flickr", ".flickr-content", link);
    });
     //Call swipe function on injected images to give swipe functionality but only to devices at and below the desktop breakpoint
    if(winWidth <= desktopBreak)
        swipe();
});


/* ----------------------------------
Listen for change from portait/landscape and reposition elements accordingly
-------------------------------------*/
$(window).resize(function(){
    winWidth = $(window).width();
    $(".flickr-content li").not(":first",":last").css({left:winWidth});
    $(".flickr-content li").eq(1).css({left:0});
    $(".flickr-content li").find(":last").css({left:-winWidth});
});


/* ----------------------------------
Adds swipe functionality to elements using hammer.js and positioning.
-------------------------------------*/
function swipe(){
    var $imageContainer = $(".flickr-content"),
        $image = $(".flickr-content li");
    /*
    Position images in stack
    -------------------------------------*/
    // If li is not first in ul set position outside-right of viewport
    $(".flickr-content li").not(":first").css({left:winWidth});
    // Move the last element in front of the first and set position outside-left of viewport
    $(".flickr-content").find(":first").before($(".flickr-content").find(":last").css({left:-winWidth}));

    /*
    On swipe left
    -------------------------------------*/
    $(".flickr-content li").hammer().bind("swipeleft", function() {
        console.log("left");
        // position the swiped element left of viewport and position next element in viewport
        $(this).css({left:-winWidth}).next().css({left:0});
        // After the animation^ move the first element to end of stack and position it outside-right of viewport
        setTimeout(function(){
            $(".flickr-content").find(":last").after($(".flickr-content").find(":first").css({left:winWidth}));
        },300);
    });

    /*
    On swipe right
    -------------------------------------*/
    $(".flickr-content li").hammer().bind("swiperight", function() {
        console.log("right");

        // position the swiped element right of viewport and position next element in viewport
        $(this).css({left:winWidth}).prev().css({left:0});
        // After the animation^ move the last element to front of stack and position it outside-left of viewport
        setTimeout(function(){
            $(".flickr-content").find(":first").before($(".flickr-content").find(":last").css({left:-winWidth}));
        },300);
    });
}

