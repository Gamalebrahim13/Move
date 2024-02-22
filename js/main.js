var Data = '';
var sidebar = document.getElementById("mySidebar");
var sidebarIcon = document.getElementById("sidebarIcon");
var searchInput = document.getElementById('search');
var categoryInput = document.getElementById('categoryInput');

// Function to fetch films from the API
async function getfilms(category) {
    var apiUrl = '';
    switch (category) {
        case 'Now playing':
            apiUrl = 'https://api.themoviedb.org/3/now_playing?api_key=01080d9fdf2c432d932059229a9af8ce';
            break;
        case 'popular':
            apiUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=01080d9fdf2c432d932059229a9af8ce';
            break;
        case 'top_rated':
            apiUrl = 'https://api.themoviedb.org/3/movie/top_rated?api_key=01080d9fdf2c432d932059229a9af8ce';
            break;
        case 'trending':
            apiUrl = 'https://api.themoviedb.org/3/trending/all/day?api_key=01080d9fdf2c432d932059229a9af8ce';
            break;
        case 'upcoming':
            apiUrl = 'https://api.themoviedb.org/3/movie/upcoming?api_key=01080d9fdf2c432d932059229a9af8ce';
            break;
        default:
            apiUrl = 'https://api.themoviedb.org/3/movie/' + category + '?api_key=01080d9fdf2c432d932059229a9af8ce';
            break;
    }
    fetchFilms(apiUrl);
}

// Function to fetch films from the API
function fetchFilms(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Check the type of data returned
            if (data.results) {
                Data = data.results;
            } else {
                // If data type is "all", set the data directly
                Data = data;
            }
            displayData();
        })
        .catch(error => console.error('Error fetching films:', error));
}

// Function to display films on the page
async function displayData() {
    var cols = ``;
    for (var i = 0; i < Data.length; i++) {
        cols +=
            `
            <div class="col-md-4 my-3 ">
                <div class="divimg">
                    <img class="w-100 ersipe-img" src="https://image.tmdb.org/t/p/w500/${Data[i].backdrop_path}" alt="${Data[i].original_title}">
                </div>
                <div class="overlay ">
                    <div>
                        <h3>${Data[i].original_title}</h3>
                        <p>${Data[i].overview}</p>
                        <p>Rate: ${Data[i].vote_average}</p>
                        <p>Date: ${Data[i].release_date}</p>
                    </div>
                </div>
            </div>
            `;
    }
    document.getElementById('rowcalls').innerHTML = cols;
}

// Function to toggle the sidebar
function toggleSidebar() {
    if (sidebar.style.left === "0px") {
        sidebar.style.left = "-280px";
        sidebarIcon.classList.remove("fa-times");
        sidebarIcon.classList.add("fa-bars");
    } else {
        sidebar.style.left = "0px";
        sidebarIcon.classList.remove("fa-bars");
        sidebarIcon.classList.add("fa-times");
    }
}
sidebarIcon.addEventListener('click', toggleSidebar);

// Function to get the appropriate link on click
function getlink() {
    var links = document.querySelectorAll('.nav-category');
    links.forEach(function (link) {
        link.addEventListener('click', function (event) {
            var category = this.textContent.trim();
            getfilms(category);
        });
    });
}

// Call the function to display popular movies on page load
getfilms('top_rated');

// Call the function to add event listeners to links
getlink();

// Function to filter movies based on search
function filterMovies(searchText) {
    var filteredMovies = Data.filter(function (movie) {
        // Convert texts to lowercase to avoid case sensitivity
        var title = movie.original_title?.toLowerCase(); // Optional chaining
        var overview = movie.overview?.toLowerCase(); // Optional chaining
        var search = searchText.toLowerCase();

        // Check if the movie title or overview contains the entered search text
        return (title && title.includes(search)) || (overview && overview.includes(search)); // Check for existence before calling toLowerCase()
    });
    // Display the filtered movies on the page
    displayFilteredMovies(filteredMovies);
}
// Function to display the filtered movies on the page
function displayFilteredMovies(movies) {
    var cols = ``;
    for (var i = 0; i < movies.length; i++) {
        cols +=
            `
            <div class="col-md-4 my-3 ">
                <div class="divimg">
                    <img class="w-100 ersipe-img" src="https://image.tmdb.org/t/p/w500/${movies[i].backdrop_path}" alt="${movies[i].original_title}">
                </div>
                <div class="overlay ">
                    <div>
                        <h3>${movies[i].original_title}</h3>
                        <p>${movies[i].overview}</p>
                        <p>Rate: ${movies[i].vote_average}</p>
                        <p>Date: ${movies[i].release_date}</p>
                    </div>
                </div>
            </div>
            `;
    }
    document.getElementById('rowcalls').innerHTML = cols;
}

// Function to handle search input change event
function handleSearchInputChange(event) {
    var searchText = event.target.value;
    filterMovies(searchText);
}

// Find the search input element and set a listener for input change event
searchInput.addEventListener('input', handleSearchInputChange);

// Function to handle category input change event


function nameValidation() {
    const regexName = /^[a-zA-Z ]+$/;
    return regexName.test(nameField.value);
}

function emailValidation() {
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexEmail.test(emailField.value);
}

  function phoneValidation() {
    const regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return regexPhone.test(phoneField.value);
  }
  
  function ageValidation() {
    const regexAge = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
    return regexAge.test(ageField.value);
  }
  
  function passwordValidation() {
    const regexPass = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
    return regexPass.test(passwordField.value);
  }
  
  function repasswordValidation() {
    return rePasswordField.value === passwordField.value;
  }
  

