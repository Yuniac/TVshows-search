// getting what the user query
const form = document.querySelector("form");
const input = document.querySelector("input[type=text]");
const notice = document.querySelector(".notice");
let query;

input.addEventListener("change", (e) => {
    query = e.target.value;
})

// searching for it (main function)
form.addEventListener("submit", (e) => {
    e.preventDefault();
    notice.style.visibility = "visible";
    input.value = "";
    input.focus();
    getShow(); //defined below;
    // clearing the container for the next search, if any
    if (results.childElementCount != 0) {
        results.innerHTML = "";
    }
});


// calling the API
const url = "http://api.tvmaze.com/search/shows?q=";

function getShow() {
    fetch(url + query)
        .then(response => {
            return response.json();
        })
        .then(jsonData => {
            displayShow(jsonData); //this "json Data is later referred to as "shows" for clarity"
            console.log(jsonData);
        })
        .catch(e => {
            console.log(e);
        })
};

// displaying the info from the APi in the page
const results = document.querySelector("#results"); //the div where the show images will be
const error = document.querySelector("h2");

function displayShow(shows) {
    if (shows.length === 0) {
        error.style.display = "block";
    } else {
        error.style.display = "none";
    }
    for (aShow of shows) {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const title = document.createElement("figcaption");
        img.src = aShow.show.image.medium;
        img.classList.add("show-img");
        if (aShow.show.rating.average === null) {
            aShow.show.rating.average = "N/A";
            title.textContent = `${aShow.show.name} | ${aShow.show.rating.average}`;
        } else {
            title.textContent = `${aShow.show.name} | ${aShow.show.rating.average}`;
        }
        results.classList.add("results")
        results.append(figure);
        figure.append(img);
        figure.append(title);
    }
}