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
};

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
};

const rateSorterClickHandler = (event) => {
  sortClickHandler(event, sortByRating);
};

// // Select the `nameSorter` link
// const nameSorter = document.querySelector("#name-sorter");
// const rateSorter = document.querySelector("#rating-sorter");

// // Add an event listener
// nameSorter.addEventListener("click", nameSorterClickHandler);
// rateSorter.addEventListener("click", rateSorterClickHandler);

const submitHandler = (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const errors = validateForm(formData);

  // Clear all previous errors
  const errorElements = document.querySelectorAll(".error");
  for (let element of errorElements) {
    element.style.display = "none";
  }

  // Display any new errors
  Object.keys(errors).forEach((key) => {
    // Find the specific error element
    const errorElement = document.querySelector(`#${key}-form .error`);
    errorElement.innerHTML = errors[key];
    errorElement.style.display = "block";
  });

  // If there are no errors
  if (!Object.keys(errors).length) {
    // Create a new element
    const parkSection = document.createElement("section");

    // Add the park class
    parkSection.classList.add("park-display");

    // Construct the HTML for this element
    const content = `
    <h2>${formData.get("name")}</h2>
    <div class="location-display">${formData.get("location")}</div>
    <div class="description-display">${formData.get("description")}</div>
    <button class="rate-button" title="Add to Favourites">&#9734;</button>
    <div class="stats">
      <div class="established-display stat">
        <h3>Established</h3>
        <div class="value">${moment(formData.get("established")).format(
          "MMMM D, YYYY"
        )}</div>
      </div>
      <div class="area-display stat">
        <h3>Area</h3>
        <div class="value">${formData.get("area")}</div>
      </div>
      <div class="rating-display stat">
        <h3>Rating</h3>
        <div class="value">${formData.get("rating")}</div>
      </div>
    </div>
    `;

    // Set the innerHTML
    parkSection.innerHTML = content;

    // Append to the main element
    document.querySelector("main").appendChild(parkSection);
  }
};

function validateExists(value) {
  return value && value.trim();
}
function validateNumber(value) {
  return !isNaN(value);
}
function validateRange(value, min, max) {
  return value >= min && value <= max;
}

function validateForm(formData) {
  const errors = {};

  // Check if name was entered
  if (!validateExists(formData.get("name"))) {
    errors.name = "Please enter a name";
  }

  // Check if rating was entered
  if (!validateExists(formData.get("rating"))) {
    errors.rating = "Please enter a rating";
  } else {
    // Check if the rating is a number
    if (!validateNumber(formData.get("rating"))) {
      errors.rating = "Rating must be a number";
    } else {
      // Because it is a number, convert it
      const rating = Number.parseFloat(formData.get("rating"));
      // Check that the rating is between 1 and 5, inclusive
      if (!validateRange(rating, 1, 5)) {
        errors.rating = "Rating must be between 1 and 5 inclusive";
      }
    }
  }

  // Check if description was entered
  if (!validateExists(formData.get("description"))) {
    errors.description = "Please enter short description";
  }

  // Check if established date was entered
  if (!validateExists(formData.get("established"))) {
    errors.established = "Please enter date";
  }

  // Check if area was entered
  if (!validateExists(formData.get("area"))) {
    errors.area = "Please enter the area of the park";
  }

  // Check if location date was entered
  if (!validateExists(formData.get("location"))) {
    errors.location = "Please enter the location of the park";
  }

  return errors;
}

const main = () => {
  const form = document.querySelector("#park-form");
  form.addEventListener("submit", submitHandler);
};

window.addEventListener("DOMContentLoaded", main);
