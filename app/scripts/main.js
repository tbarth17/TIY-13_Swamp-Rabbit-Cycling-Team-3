var flickrKey = "0c74aabb810c286e7cb95d06496650f2",
    tags = "bicycle,bicycles,mountainbike",
    flickrCount = 3,
    flickrSize = "_z",
    flickrApiLink =
    "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + flickrKey + "&format=json&tags=" + tags + "&jsoncallback=?&per_page=" + flickrCount,
    docWidth = $(document).width(),
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
    if(docWidth <= desktopBreak)
        swipe();
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
    $image.not(":first").css({left:docWidth});
    // Move the last element in front of the first and set position outside-left of viewport
    $imageContainer.find(":first").before($(".flickr-content").find(":last").css({left:-docWidth}));

    /*
    On swipe left
    -------------------------------------*/
    $image.hammer().bind("swipeleft", function() {
        // position the swiped element left of viewport and position next element in viewport
        $(this).css({left:-docWidth}).next().css({left:0});
        // After the animation^ move the first element to end of stack and position it outside-right of viewport
        setTimeout(function(){
            $imageContainer.find(":last").after($imageContainer.find(":first").css({left:docWidth}));
        },0);
    });

    /*
    On swipe right
    -------------------------------------*/
    $image.hammer().bind("swiperight", function() {
        // position the swiped element right of viewport and position next element in viewport
        $(this).css({left:docWidth}).prev().css({left:0});
        // After the animation^ move the last element to front of stack and position it outside-left of viewport
        setTimeout(function(){
            $imageContainer.find(":first").before($imageContainer.find(":last").css({left:-docWidth}));
        },0);
    });
}

