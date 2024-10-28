let page = 1;
let backButton = document.getElementById("backPage");
backButton.disabled = true;
let nextButton = document.getElementById("nextPages");
function fetchListMovie() {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzBkMjViMGI3OGU4NzgyZTRiNTY3YjYyNDAyYzAzNyIsInN1YiI6IjY0ODFmNDA5ZTI3MjYwMDBhZmMxNDYxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jAvb2eVIzf0KDAZ4ZYMuJWLn2BuYhKGqJo-hpx1-67c'
        }
    }
    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
        .then(response => response.json())
        .then(response => putDataOnHTML(response))
        .catch(err => console.error(err));
}
fetchListMovie();

function putDataOnHTML(data) {
    let container = document.getElementById("main-container");
    container.innerHTML = "";

    for (let i = 0; i < data.results.length; i++) {
        let containerMovie = document.createElement("div");
        //containerMovie.setAttribute("class", "movie-container col-6 col-sm-6 col-md-4 col-lg-3 mb-4 shadow rounded border ");

        containerMovie.setAttribute("class", "movie-container col-lg-3 col-md-4 col-sm-6 col-6  p-2 "); // Colunas ajustadas

        //containerMovie.style.margin = "0.5rem";
        containerMovie.setAttribute("id", data.results[i].id);
        containerMovie.setAttribute("onclick", "getDataFromID(this)");

        let img = document.createElement("img");
        img.setAttribute("src", "https://image.tmdb.org/t/p/w440_and_h660_face" + data.results[i].poster_path);
        img.setAttribute("class", "w-100 rounded-top border border-dark border-0 border-bottom  shadow");

        let contentMovie = document.createElement("div");
        contentMovie.setAttribute("class", "movie-title-and-release-date-vote-average d-flex flex-column shadow rounded border p-1");
        let title = document.createElement("h5");
        title.innerHTML = data.results[i].title;

        let releaseDate = document.createElement("span");
        releaseDate.innerHTML = data.results[i].release_date;

        let voteAverage = document.createElement("p");
        voteAverage.setAttribute("class", "text-light bg-info p-1 rounded-1 align-self-end");
        voteAverage.innerHTML = Math.round(data.results[i].vote_average * 10) + "%";

        contentMovie.appendChild(title);
        contentMovie.appendChild(releaseDate);
        contentMovie.appendChild(voteAverage);

        containerMovie.appendChild(img);
        containerMovie.appendChild(contentMovie);

        // Append the movie container to the main container
        container.appendChild(containerMovie);
    }
}

function searchMovie(input) {
    const search = document.getElementById("search").value;
    if (search.length == 0) {
        let modal = new bootstrap.Modal(document.getElementById('modal'));

        modal.show();
        return;
    }
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzBkMjViMGI3OGU4NzgyZTRiNTY3YjYyNDAyYzAzNyIsInN1YiI6IjY0ODFmNDA5ZTI3MjYwMDBhZmMxNDYxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jAvb2eVIzf0KDAZ4ZYMuJWLn2BuYhKGqJo-hpx1-67c'
        }
    }

    fetch('https://api.themoviedb.org/3/search/movie?query=' + search, options)
        .then(response => response.json())
        .then(response => {
            if (response.results.length == 0) {
                window.location.href = 'notFoundPage.html';
                return;
            }
            putDataOnHTML(response);

        })
        .catch(err => console.error(err));
}
function goToHomePage() {

    window.location.href = 'startPage.html';
}
function nextPages() {
    page++;
    if (page > 1) {
        backButton.disabled = false;
    }

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzBkMjViMGI3OGU4NzgyZTRiNTY3YjYyNDAyYzAzNyIsInN1YiI6IjY0ODFmNDA5ZTI3MjYwMDBhZmMxNDYxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jAvb2eVIzf0KDAZ4ZYMuJWLn2BuYhKGqJo-hpx1-67c'
        }
    }



    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=' + page, options)
        .then(response => response.json())
        .then(response => {
            if (page == response.total_pages) {
                nextButton.disabled = true;
            }
            putDataOnHTML(response)
        }
        )
        .catch(err => console.error(err));
}
function backPages() {
    page--;
    if (page == 1) {
        backButton.disabled = true;
    }


    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzBkMjViMGI3OGU4NzgyZTRiNTY3YjYyNDAyYzAzNyIsInN1YiI6IjY0ODFmNDA5ZTI3MjYwMDBhZmMxNDYxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jAvb2eVIzf0KDAZ4ZYMuJWLn2BuYhKGqJo-hpx1-67c'
        }
    }


    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=' + page, options)
        .then(response => response.json())
        .then(response => putDataOnHTML(response))
        .catch(err => console.error(err));

}
function getDataFromID(element) {
    let movieID = element.getAttribute("id");
    window.location.replace(`infoPage.html?id=${movieID}`);
}

function fetchTopMovies() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzBkMjViMGI3OGU4NzgyZTRiNTY3YjYyNDAyYzAzNyIsInN1YiI6IjY0ODFmNDA5ZTI3MjYwMDBhZmMxNDYxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jAvb2eVIzf0KDAZ4ZYMuJWLn2BuYhKGqJo-hpx1-67c'
        }
    };

    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
        .then(response => response.json())
        .then(response => topMovies(response))
        .catch(err => console.error(err));
}

function topMovies(data) {
    let container = document.getElementById("main-container");
    container.innerHTML = "";

    for (let i = 0; i < data.results.length; i++) {
        let containerMovie = document.createElement("div");
        containerMovie.setAttribute("class", "movie-container   col-6 col-sm-6 col-md-4 col-lg-3 shadow  rounded border");
        containerMovie.setAttribute("id", data.results[i].id);
        containerMovie.setAttribute("onclick", "getDataFromID(this)");

        let imageMovie = document.createElement("div");
        imageMovie.setAttribute("class", "movie-image");
        let img = document.createElement("img");


        img.setAttribute("src", "https://image.tmdb.org/t/p/w440_and_h660_face" + data.results[i].poster_path);
        img.setAttribute("class", "w-100");

        imageMovie.appendChild(img);


        let contentMovie = document.createElement("div");
        contentMovie.setAttribute("class", "movie-title-and-release-date-vote-average d-flex flex-column");
        let title = document.createElement("h5");
        title.innerHTML = data.results[i].title;

        let releaseDate = document.createElement("span");
        releaseDate.innerHTML = data.results[i].release_date;

        let voteAverage = document.createElement("p");
        voteAverage.setAttribute("class", "text-light bg-info p-1 rounded-1 align-self-end");
        voteAverage.innerHTML = Math.round(data.results[i].vote_average * 10) + "%";

        contentMovie.appendChild(title);
        contentMovie.appendChild(releaseDate);
        contentMovie.appendChild(voteAverage);

        containerMovie.appendChild(imageMovie);
        containerMovie.appendChild(contentMovie);

        container.appendChild(containerMovie);

    }
}
