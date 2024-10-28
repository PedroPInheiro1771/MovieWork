const urlParams = new URLSearchParams(window.location.search);

const movieID = urlParams.get('id');


const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzBkMjViMGI3OGU4NzgyZTRiNTY3YjYyNDAyYzAzNyIsInN1YiI6IjY0ODFmNDA5ZTI3MjYwMDBhZmMxNDYxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jAvb2eVIzf0KDAZ4ZYMuJWLn2BuYhKGqJo-hpx1-67c'
    }
};

fetch(`https:api.themoviedb.org/3/movie/${movieID}?language=en-US`, options)
    .then(response => response.json())
    .then(response => infoPage(response))
    .catch(err => console.error(err));



function infoPage(data) {

    let imageMovie = document.getElementById("container");
    imageMovie.setAttribute("class", "movie-container d-flex justify-content-start pt-5");

    let infoMovie = document.createElement("div");
    infoMovie.setAttribute("class", "m-4")
    let img = document.createElement("img");
    img.setAttribute("src", "https:image.tmdb.org/t/p/w440_and_h660_face" + data.poster_path);
    img.setAttribute("class", "m-4");

    let title = document.createElement("h5");
    title.innerHTML = data.title;

    let sinopse = document.createElement("p");
    sinopse.innerHTML = data.overview;
    infoMovie.appendChild(title);
    infoMovie.appendChild(sinopse);

    imageMovie.appendChild(img);
    imageMovie.appendChild(infoMovie);



}

function goToHomePage() {

    window.location.href = 'startPage.html';
}

