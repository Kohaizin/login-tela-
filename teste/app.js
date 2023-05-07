const apiKey = '64556d4b36914371e034f9cef5b8697c';

function searchMovies(query) {
	const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=${query}`;

	$.getJSON(url, function(data) {
		const movies = data.results;

		$('#movies-container').empty();

		if (movies.length > 0) {
			$.each(movies, function(i, movie) {
				const movieElement = `
					<div class="movie">
						<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
						<h2>${movie.title}</h2>
						<p>${movie.release_date}</p>
					</div>
				`;

				$('#movies-container').addEventListener('click', function(e){
          if(e.target.classList.contains('movie')){
            const movieID = e.target.dataset.movieID;
            displayMovieDetails(movieID);
          }
        });
			});

      function displayMovieDetails(movieId){
        const movieElement = document.querySelector(`.movie[data-movie-id="${movieId}"]`);
        const title = movieElement.dataset.movieTitle;
        const releaseDate = movieElement.dataset.movieReleaseDate;
        const overview = movieElement.dataset.movieOverview;
        const posterPath = movieElement.dataset.moviePosterPath;
    }
    


		} else {
			const errorMessage = `
				<div class="movie">
					<h2>Nenhum filme encontrado</h2>
				</div>
			`;

			$('#movies-container').append(errorMessage);
		}
	});
}

$('form').submit(function(event) {
	event.preventDefault();
	const searchTerm = $('#search-input').val();
	searchMovies(searchTerm);
});






















// selecione o elemento que contém a lista de filmes
const listaFilmes = document.querySelector("#lista-filmes");

// adicione um evento de clique em cada filme da lista
listaFilmes.addEventListener("click", (event) => {
  // verifique se o elemento clicado é um filme
  if (event.target.classList.contains("filme")) {
    // obtenha o ID do filme a partir do atributo 'data-id'
    const filmeId = event.target.dataset.id;
    
    // faça uma requisição para a API do TMDB para obter as informações do filme
    fetch(`https://api.themoviedb.org/3/movie/${filmeId}?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        // crie um elemento para exibir as informações do filme
        const filmeInfo = document.createElement("div");
        filmeInfo.classList.add("filme-info");
        
        // adicione a imagem do filme
        const img = document.createElement("img");
        img.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
        filmeInfo.appendChild(img);
        
        // adicione a descrição do filme
        const descricao = document.createElement("p");
        descricao.textContent = data.overview;
        filmeInfo.appendChild(descricao);
        
        // crie um elemento para exibir o player de vídeo
        const player = document.createElement("video");
        player.src = `https://www.youtube.com/watch?v=${data.videos.results[0].key}`;
        player.controls = true;
        
        // adicione os elementos na página
        const container = document.querySelector("#container");
        container.innerHTML = "";
        container.appendChild(filmeInfo);
        container.appendChild(player);
      })
      .catch((error) => console.log(error));
  }
});
