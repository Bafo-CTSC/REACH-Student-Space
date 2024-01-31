// This is the JavaScript file that adds the functionality to your webpage
// You will need to add an event listener to the form element, so that when the user submits the query, you can get the value of the input element and send it to the API
// You will also need to handle the response from the API, and display the definition in the div element
// You can use any API you want, but one example is the Merriam-Webster Dictionary API, which provides definitions, synonyms, antonyms, and more for English words
// You will need to register for a free API key to use it

// Get the form element by its id
const form = document.getElementById("search-form");

// Get the input element by its id
const input = document.getElementById("search-input");

// Get the button element by its id
const button = document.getElementById("search-button");

// Get the div element by its id
const results = document.getElementById("results");

// Add an event listener to the form element, so that when the user submits the query, you can get the value of the input element and send it to the API
form.addEventListener("submit", function(event) {
    // Prevent the default behavior of the form element, which is to reload the page
    event.preventDefault();

    // Get the value of the input element, which is the word that the user typed
    const word = input.value;

    // Check if the word is not empty
    if (word) {
        // Disable the button element, so that the user cannot submit multiple queries at the same time
        button.disabled = true;

        // Clear the previous results, if any
        results.innerHTML = "";

        // Display a loading message
        results.innerHTML = "Loading...";

        // Create a variable to store the URL of the API
        // You will need to replace the "YOUR-API-KEY" with your own API key that you obtained from the Merriam-Webster website
        const url = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + word + "?key=YOUR-API-KEY";

        // Use the fetch function to send a request to the API
        fetch(url)
            .then(function(response) {
                // Check if the response is successful
                if (response.ok) {
                    // Convert the response to a JSON object
                    return response.json();
                } else {
                    // Throw an error if the response is not successful
                    throw new Error("Something went wrong");
                }
            })
            .then(function(data) {
                // Check if the data is an array
                if (Array.isArray(data)) {
                    // Check if the data is not empty
                    if (data.length > 0) {
                        // Check if the first element of the data is an object
                        if (typeof data[0] === "object") {
                            // Get the first element of the data, which is the most relevant result
                            const result = data[0];

                            // Check if the result has a shortdef property, which is an array of definitions
                            if (result.shortdef) {
                                // Get the shortdef property, which is an array of definitions
                                const definitions = result.shortdef;

                                // Clear the loading message
                                results.innerHTML = "";

                                // Display the word and its part of speech
                                results.innerHTML += "<p><strong>" + word + "</strong> (" + result.fl + ")</p>";

                                // Display the definitions as an ordered list
                                results.innerHTML += "<ol>";
                                for (let i = 0; i < definitions.length; i++) {
                                    results.innerHTML += "<li>" + definitions[i] + "</li>";
                                }
                                results.innerHTML += "</ol>";
                            } else {
                                // Display a message if the result does not have a shortdef property
                                results.innerHTML = "No definition found for " + word;
                            }
                        } else {
                            // Display a message if the first element of the data is not an object
                            results.innerHTML = "No definition found for " + word;
                        }
                    } else {
                        // Display a message if the data is empty
                        results.innerHTML = "No definition found for " + word;
                    }
                } else {
                    // Display a message if the data is not an array
                    results.innerHTML = "No definition found for " + word;
                }

                // Enable the button element, so that the user can submit another query
                button.disabled = false;
            })
            .catch(function(error) {
                // Display the error message if there is any
                results.innerHTML = error.message;

                // Enable the button element, so that the user can submit another query
                button.disabled = false;
            });
    } else {
        // Display a message if the word is empty
        results.innerHTML = "Please enter a word";
    }
});
