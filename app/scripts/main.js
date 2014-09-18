// Jonathan's Flickr API key
// 0c74aabb810c286e7cb95d06496650f2
// 5c3bc5492969afe0

function renderTemplate(scriptID, whereTo, data) {
    console.log(data);
    var template = _.template( $("#" + scriptID).text() );
    $(whereTo).append(template(data));

}

var flickrKey = "0c74aabb810c286e7cb95d06496650f2",
    tags = "bike,bicycles,mountainbike",
    flickrCount = 9,
    flickrSize = "_z";

var flickrApiLink =
    "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + flickrKey + "&format=json&tags=" + tags + "&jsoncallback=?&per_page="+flickrCount;
$.ajax({
    url: flickrApiLink,
    type: "GET",
    dataType: "json"
}).done(function(photoData) {
    _.each(photoData.photos.photo, function(img) {
        var link = {flickrLink: "https://farm" + img.farm + ".staticflickr.com/" + img.server + "/" + img.id + "_" + img.secret + flickrSize +".jpg"};
        console.log(link);
            renderTemplate("template-flikr", ".flikr-content", link);
    });
});
