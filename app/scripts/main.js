// Jonathan's Flickr API key
// 0c74aabb810c286e7cb95d06496650f2
// 5c3bc5492969afe0
var flickrKey = "0c74aabb810c286e7cb95d06496650f2",
    tags = "bike,bicycles,mountainbike"

    function renderTemplate(scriptID, whereTo, data) {
        var template = _.template($("#" + scriptID.text()));
        $(whereTo).append(template(data))

    }

var flickrApiLink =
    "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + flickrKey + "&format=json&tags=" + tags;
//console.log(flickrApiLink);



$.ajax({
    url: flickrApiLink,
    type: "GET",
    dataType: "json"
}).done(function(data) {
	_.each(data, function(image){
    	console.log("Data ", image);
	}).fail(function(){
		console.log("Problem");
	});
});