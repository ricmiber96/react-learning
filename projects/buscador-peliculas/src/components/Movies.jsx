function ListOfMovies ({ movies }) {
  return (

    <ul className='movies-grid'>
      {
        movies.map(movie => (
          <li key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <img src={movie.poster} alt={movie.title} />
          </li>
        ))
      }
    </ul>

  )
}

function NoResults () {
  return (
    <p>No se encontraron peliculas para esta busqueda</p>
  )
}

export function Movies ({ movies }) {
  const hasMovies = movies?.length > 0
  return (
    hasMovies
      ? <ListOfMovies movies={movies} />

      : <NoResults />

  )
}
