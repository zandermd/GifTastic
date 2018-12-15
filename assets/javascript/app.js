//create varible of topics 
var topics = ["Hiking", "Camping", "Rock Climbing", "Swimming", "Fishing", "Hunting", "Star Gazing", "S'mores", "Campfire", "Kayaking"];

//for loop to run through array and add buttons to the HTML

for (var z = 0; z < topics.length; z++) {
    var button = $("<button>").text(topics[z]);
    button.attr("data-outdoor", topics[z]);
    button.addClass("outdoor-button");
    $("#button-group").append(button);
}
//on click functions
$("#add-outdoor-button").on("click", function (e) {
    e.preventDefault();
    var alreadyExist = false;
    if (topics.indexOf($("#new-outdoor-input").val()) !== -1) {
        alreadyExist = true;
    }

    if ($("#new-outdoor-input").val() !== "" && alreadyExist === false) {
        var newOutdoor = $("#new-outdoor-input").val().toLowerCase();
        topics.push(newOutdoor);
        var button = $("<button>").text(newOutdoor);
        button.attr("data-outdoor", newOutdoor);
        button.addClass("outdoor-button");
        $("#button-group").append(button);
    }
    $("#new-outdoor-input").val("");

});
//on click to add gifs to the page through API 
$(document).on("click", ".outdoor-button", function () {
    var outdoors = $(this).attr("data-outdoor");
    var key = 'Rts1E3CaUhQgPgL9Cbf5WgSsC14V3HEN'
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + key + "&q=outdoors&limit=10&offset=0&rating=PG-13&lang=en";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        var results = response.data;

        console.log(results);

        var resultsContainerSection = $("<section class='results-container'>");

        for (var i = 0; i < results.length; i++) {
            var singleResultDiv = $("<div class='result-container'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var outdoorImg = $("<img class='result'>");
            outdoorImg.attr("src", results[i].images.fixed_height_still.url);
            outdoorImg.attr("data-state", "still");
            outdoorImg.attr("data-still", results[i].images.fixed_height_still.url);
            outdoorImg.attr("data-animate", results[i].images.fixed_height.url);

            singleResultDiv.prepend(outdoorImg);
            singleResultDiv.prepend(p);

            resultsContainerSection.prepend(singleResultDiv);
        }
        $("#container").prepend(resultsContainerSection);
    });

});

$(document).on("click", ".result", function () {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});
