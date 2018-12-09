$(document).ready(function () {
    $("button").on("click", (function () {
        //this is the on click event 
        var topics = $(this).attr("data");
        //add queryURL for the API 
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topics + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
