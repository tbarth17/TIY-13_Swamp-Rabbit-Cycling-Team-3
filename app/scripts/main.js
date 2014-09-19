// Jonathan's Flickr API key
// 0c74aabb810c286e7cb95d06496650f2
// 5c3bc5492969afe0

// Twitter API Key
// n7KF5sVBEUxL1fsK6KprbnRoM
// uTUuLeEgldlyRPEkx09a7K6Y3ejDM4DBhVCgQ6HOflJinxSvYf

// var request = new XMLHttpRequest();
// request.setRequestHeader('Authorization','OAuth oauth_consumer_key="HdFdA3C3pzTBzbHvPMPw", oauth_nonce="4148fa6e3dca3c3d22a8315dfb4ea5bb", oauth_signature="uDZP2scUz6FUKwFie4FtCtJfdNE%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp= "1359955650", oauth_token, "1127121421-aPHZHQ5BCUoqfHER2UYhQYUEm0zPEMr9xJYizXl", oauth_version="1.0"');

function renderTemplate(scriptID, whereTo, data) {
    console.log(data);
    var template = _.template($("#" + scriptID).text());
    $(whereTo).append(template(data));

}

var flickrKey = "0c74aabb810c286e7cb95d06496650f2",
    tags = "bicycle,bicycles,mountainbike",
    flickrCount = 3,
    flickrSize = "_z";

var flickrApiLink =
    "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + flickrKey + "&format=json&tags=" + tags + "&jsoncallback=?&per_page=" + flickrCount;
$.ajax({
    url: flickrApiLink,
    type: "GET",
    dataType: "json"
}).done(function(photoData) {
    _.each(photoData.photos.photo, function(img) {
        var link = {
            flickrLink: "https://farm" + img.farm + ".staticflickr.com/" + img.server + "/" + img.id + "_" + img.secret + flickrSize + ".jpg"
        };
        //console.log(link);
        renderTemplate("template-flikr", ".flikr-content", link);
        //$("li").css("background-image", "url()")
    });
});

// Hammer JS
    $(".flikr-content").hammer().bind("pan", function(){
        console.log("Touched!");
    });
