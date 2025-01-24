// Referencias a elementos del DOM
const contenedorPeliculas = document.getElementById('contenedor-peliculas');
const contenedorTitulos = document.getElementById('contenedor-titulos');
const botonMostrarTitulos = document.getElementById('mostrar-titulos');

// Crear y agregar un nuevo botón para filtrar por género
const botonFiltrarGenero = document.createElement('button');
botonFiltrarGenero.textContent = 'Filtrar por Género';
botonFiltrarGenero.style.display = 'block';
botonFiltrarGenero.style.margin = '20px auto';
document.body.appendChild(botonFiltrarGenero);

// Cargar el JSON y mostrar las películas
fetch('peliculas.json')
  .then((response) => response.json())
  .then((data) => {
    // Guardar el JSON en una variable global para reutilizar
    window.peliculas = data;

    // Mostrar todas las películas
    let htmlContent = '';
    for (let i = 0; i < data.length; i++) {
      htmlContent += `<p><strong>${data[i].titulo}</strong> - Año: ${data[i].año}, Género: ${data[i].genero}</p>`;
    }
    contenedorPeliculas.innerHTML = htmlContent;
  });

// Mostrar solo los títulos de las películas
botonMostrarTitulos.addEventListener('click', () => {
  if (!window.peliculas) return;

  let htmlContent = '';
  for (let i = 0; i < window.peliculas.length; i++) {
    htmlContent += `<p>${window.peliculas[i].titulo}</p>`;
  }
  contenedorTitulos.innerHTML = htmlContent;
});

// Filtrar las películas por género
botonFiltrarGenero.addEventListener('click', () => {
  if (!window.peliculas) return;

  const genero = prompt('Ingrese el género que desea filtrar (e.g., Animación, Ciencia Ficción, Acción):');

  if (!genero) return; // Si el usuario no ingresa nada, salir

  const peliculasFiltradas = window.peliculas.filter(pelicula => pelicula.genero.toLowerCase() === genero.toLowerCase());

  let htmlContent = '';
  if (peliculasFiltradas.length > 0) {
    for (let i = 0; i < peliculasFiltradas.length; i++) {
      htmlContent += `<p><strong>${peliculasFiltradas[i].titulo}</strong> - Año: ${peliculasFiltradas[i].año}, Género: ${peliculasFiltradas[i].genero}</p>`;
    }
  } else {
    htmlContent = '<p>No se encontraron películas para el género ingresado.</p>';
  }

  contenedorPeliculas.innerHTML = htmlContent;
});
