//create varible of topics 
var topics = ["Hiking", "Camping", "Rock Climbing", "Swimming", "Fishing", "Hunting", "Star Gazing", "S'mores", "Campfire", "Kayaking"];

//for loop to run through array and add buttons to the HTML

for (var i = 0; i < topics.length; i++) {
    var button = $("<button>").text(topics[i]);
    button.attr("data-outdoor", topics[i]);
    button.addClass("outdoor-button");
    $("#button-group").append(button);
}

$("add-outdoor-button").on("click", function (e) {
    e.preventDefault();
    var alreadyExist = false;
    if (topics.indexOf($("#new-outdoor-input").val()) !== -1) {
        alreadyExist = true;
    }

    if ($("#new-outdoor-input").val() !== "" && alreadyExist === false) {
        var newAdventure = $("#new-adventure-input").val().toLowerCase();
        topics.push(newAdventure);
        var button = $("<button>").text(newAdventure);
        button.attr("data-outdoor", newAdventure);
        button.addClass("outdoor-button");
        $("#button-group").append(button);
    }
    $("#new-outdoor-input").val("");

});

$(document).on("click", ".adventure-button", function () {
    var outdoors = $(this).attr("data-outdoors");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        outdoors + "&api_key=QlN4l8JNkLJjexCRE2QGzqU14JsTxgSL";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {

        var results = response.data;

        var resultsContainerSection = $("<section class ='results-container'>");

        console.log(results);

        for (var i = 0; i < results.length; i++) {
            var singleResultDiv = $("<div class='result-container'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var adventureImg = $("<img class='result'>");
            adventureImg.attr("src", results[i].images.fixed_height_still.url);
            adventureImg.attr("data-state", "still");
            adventureImg.attr("data-still", results[i].images.fixed_height_still.url);
            adventureImg.attr("data-animate", results[i].images.fixed_height.url);

            singleResultDiv.prepend(adventureImg);
            singleResultDiv.prepend(p);

            resultsContainerSection.prepend(singleResultDiv);
        }
        $("#adventure-group").prepend(resultsContainerSection);
    });

});

