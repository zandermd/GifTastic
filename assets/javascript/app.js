//document ready

$(document).ready(function () {
    console.log("ready!");

    //create varible of topics 
    var topics = ["Hiking", "Camping", "Rock Climbing", "Swimming", "Fishing", "Hunting", "Star Gazing", "S'mores", "Campfire", "Kayaking"];

    //for loop to run through array and add buttons to the HTML

    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>").text(topics[i]);
        button.attr("data-outdoor", topics[i]);
        button.addClass("outdoor-button");
        $("#button-group").append(button);
    }
    //on click function to add new outdoor activity
    $("add-outdoor-button").on("click", function (e) {
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
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            outdoors + "&api_key=QlN4l8JNkLJjexCRE2QGzqU14JsTxgSL&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {

                var results = response.data;

                var resultsContainerSection = $("<section class ='results-container'>");

                console.log(resultsContainerSection);

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
                $("#outdoor-group").prepend(resultsContainerSection);
            });

    });

});

