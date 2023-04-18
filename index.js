const descriptions = document.querySelectorAll(".description-display");

for (let desc of descriptions.values()) {
  let content = desc.innerText;
  if (content.length > 250) {
    content = content.slice(0, 250);
    content += '<a href="#">...</a>';
  }

  desc.innerHTML = content;
}

const ratings = document.querySelectorAll(".rating-display .value");
for (let rating of ratings) {
  let ratingValue = parseFloat(rating.innerText);

  if (ratingValue > 4.7) {
    rating.classList.add("high-rating");
    rating.classList.remove("value");
  }
}

const parks = document.querySelectorAll(".park-display");
const numberParks = parks.length;
const newElement = document.createElement("div");
newElement.innerText = `${numberParks} exciting parks to visit`;
newElement.classList.add("header-statement");
const header = document.querySelector("header");
header.appendChild(newElement);

const allBtns = document.querySelectorAll(".rate-button");

// Iterate through the list of buttons and add an event handler to each
allBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const park = event.target.parentNode;
    park.style.backgroundColor = "#feffee";
  });
});
// Function for sorting by name
const sortByName = (parkA, parkB) => {
  const parkAName = parkA.querySelector("h2").innerText;
  const parkBName = parkB.querySelector("h2").innerText;
  if (parkAName < parkBName) {
    return -1;
  } else if (parkAName > parkBName) {
    return 1;
  } else {
    return 0;
  }
};
const sortByRating = (parkA, parkB) => {
  const parkARating = parkA.querySelector(".rating-display").innerText;
  const parkBRating = parkB.querySelector(".rating-display").innerText;
  if (parkARating < parkBRating) {
    return 1;
  } else if (parkARating > parkBRating) {
    return -1;
  } else {
    return 0;
  }
}

// Function for handling the `nameSorter` click

const sortClickHandler = (event, sortCriteria) => {
  event.preventDefault();

  // 1.  Get the main element
  const main = document.querySelector("main");

  // 2. Get the list of parks
  const parksList = main.querySelectorAll(".park-display");

  // 3. Empty the main
  main.innerHTML = "";

  // 4. Create an array
  const parksArray = Array.from(parksList);

  // 5. Sort the array
  parksArray.sort(sortCriteria);

  // 6. Insert each park into the DOM
  parksArray.forEach((park) => {
    main.appendChild(park);
  });
};

const nameSorterClickHandler = (event) => {
  sortClickHandler(event, sortByName);
}

const rateSorterClickHandler = (event) => {
  sortClickHandler(event, sortByRating);
}

// Select the `nameSorter` link
const nameSorter = document.querySelector("#name-sorter");
const rateSorter = document.querySelector("#rating-sorter");

// Add an event listener
nameSorter.addEventListener("click", nameSorterClickHandler);
rateSorter.addEventListener("click", rateSorterClickHandler);