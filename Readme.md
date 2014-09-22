# Single-page website for small business

### What does it do?

-	Uses *Neat* to control layout and responsive breakpoints
-	Makes an *AJAX* call to the *Flickr* API and grabs images
-	Injects images as backgrounds of <li>
-	Uses *Hammer.js* along with a custom-built image slider to exchange images on swipe
-	Injects a Google map with pinpointed location

#### Cool swipe slider thing:

```js

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

```