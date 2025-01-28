document.addEventListener("DOMContentLoaded", () => {
    const moviesContainer = document.getElementById("movies-container");
    const genreFilter = document.getElementById("genre-filter");
    const genreButtons = document.getElementById("genre-buttons");
    const searchTitle = document.getElementById("search-title");
    const searchButton = document.getElementById("search-button");
    const sortButton = document.getElementById("sort-button");

    let movies = [];
    let filteredMovies = [];

    // Cargar JSON con películas
    fetch("peliculas.json")
        .then(response => response.json())
        .then(data => {
            movies = data;
            filteredMovies = movies;
            displayMovies(movies);
            populateGenres();
        })
        .catch(error => console.error("Error al cargar las películas:", error));

    // Función para mostrar las películas en pantalla
    function displayMovies(movies) {
        moviesContainer.innerHTML = "";
        if (movies.length === 0) {
            moviesContainer.innerHTML = "<p style='text-align:center; font-size: 1.5rem; color: #e50914;'>No hay películas que coincidan con el filtro.</p>";
            return;
        }
        movies.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.className = "movie-card";
            movieCard.innerHTML = `
                <img src="${movie.imagen}" alt="${movie.titulo}">
                <div class="movie-details">
                    <h3>${movie.titulo}</h3>
                    <p>Género: ${movie.genero}</p>
                    <p>Año: ${movie.año}</p>
                </div>
            `;
            moviesContainer.appendChild(movieCard);
        });
    }

    // Poblar la lista de géneros en el <select> y en los botones
    function populateGenres() {
        const genres = [...new Set(movies.map(movie => movie.genero))];
        genres.forEach(genre => {
            const option = document.createElement("option");
            option.value = genre;
            option.textContent = genre;
            genreFilter.appendChild(option);

            const button = document.createElement("button");
            button.textContent = genre;
            button.classList.add("genre-btn");
            button.addEventListener("click", () => filterByGenre(genre));
            genreButtons.appendChild(button);
        });
    }

    // Filtrar por género
    genreFilter.addEventListener("change", () => {
        const selectedGenre = genreFilter.value;
        if (selectedGenre === "todos") {
            filteredMovies = movies;
        } else {
            filteredMovies = movies.filter(movie => movie.genero === selectedGenre);
        }
        displayMovies(filteredMovies);
    });

    // Filtrar por género con botones
    function filterByGenre(genre) {
        filteredMovies = movies.filter(movie => movie.genero === genre);
        displayMovies(filteredMovies);
    }

    // 🔍 Búsqueda por título (Arreglada)
    searchButton.addEventListener("click", () => {
        const searchTerm = searchTitle.value.toLowerCase();
        filteredMovies = movies.filter(movie =>
            movie.titulo.toLowerCase().includes(searchTerm)
        );
        displayMovies(filteredMovies);
    });

    // También buscar al presionar Enter
    searchTitle.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            searchButton.click();
        }
    });

    // Ordenar por año
    let sortAsc = true;
    sortButton.addEventListener("click", () => {
        filteredMovies.sort((a, b) => (sortAsc ? a.año - b.año : b.año - a.año));
        sortAsc = !sortAsc;
        displayMovies(filteredMovies);
    });
});
