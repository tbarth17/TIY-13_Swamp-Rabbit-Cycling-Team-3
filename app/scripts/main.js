var flickrKey = "0c74aabb810c286e7cb95d06496650f2",
    tags = "bicycle,bicycles,mountainbike",
    flickrCount = 3,
    flickrSize = "_z",
    flickrApiLink =
    "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + flickrKey + "&format=json&tags=" + tags + "&jsoncallback=?&per_page=" + flickrCount,
    $imageContainer = $(".flickr-content"),
    $images = $(".flickr-content li"),
    docWidth = $(document).width();


function renderTemplate(scriptID, whereTo, data) {
    var template = _.template($("#" + scriptID).text());
    $(whereTo).append(template(data));
}

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

    if(docWidth <= 480)
        swipe();
});


function swipe(){
    // Position images in stack
    // If li is not first set position outside right of viewport
    $(".flickr-content li").not(":first").css({left:docWidth});
    // Move the last element in front of the first and set position outside left of viewport
    $(".flickr-content").find(":first").before($(".flickr-content").find(":last").css({left:-docWidth}));

    $(".flickr-content li").hammer().bind("swipeleft", function() {
        // position the swiped element left of viewport and position next element in viewport
        $(this).css({left:-docWidth}).next().css({left:0});
        // After the animation^ move the first element to end of stack and position it right of viewport
        setTimeout(function(){
            $(".flickr-content").find(":last").after($(".flickr-content").find(":first").css({left:docWidth}));
        },200);
    });
    $(".flickr-content li").hammer().bind("swiperight", function() {
        // position the swiped element right of viewport and position next element in viewport
        $(this).css({left:docWidth}).prev().css({left:0});
        // After the animation^ move the last element to front of stack and position it left of viewport
        setTimeout(function(){
            $imageContainer.find(":first").before($imageContainer.find(":last").css({left:-docWidth}));
        },200);
    });
}

