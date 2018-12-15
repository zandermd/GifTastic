# Requirements
Generate a set of buttons based on an array of related strings
Allow user to create new button based on text input
Generate a set of gif images based on which button is being clicked
Initialize gif's as stills but allow for animation once clicked

#Code Explanation
Buttons are dynamically generated using jQuery, an array, and a for-loop
Depending on the button clicked, that will send out an AJAX call using the appropriate query to Giphy 
Given the JSON response object, we must then parse through it to display in the HTML using jQuery and the general principle of DOM manipulation
HTML and CSS were used to style and give the page its basic structure