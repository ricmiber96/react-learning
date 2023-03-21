import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import debounce from 'just-debounce-it'


function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirtsRender = useRef(true)

  useEffect(() => {
    if (isFirtsRender.current) {
      isFirtsRender.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una película vacía')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número')
      return
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}

function App () {
  
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce(search => {
      console.log(search)
      getMovies({search})
    }, 300)
    , [getMovies]
    )

  const handleSubmit = (ev) => {
    ev.preventDefault()
    // NOS PERMITE OBTENER EL VALOR DE TODOS LOS ELEMENTOS DEL FORM SIN UTILIZAR REFERENCIAS
    const fields = Object.fromEntries(new window.FormData(ev.target))
    console.log(fields)
    getMovies({ search })
  }

  const handleChange = (ev) => {
    const newSearch = ev.target.value
    if (newSearch.startsWith(' ')) return
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>
      <header>
        <h1>Movie Search 🎬</h1>
        <form onSubmit={handleSubmit}>
          <div className='search-movie'>
            <input required onChange={handleChange} name='movieQuery' placeholder='Search a movie by name...' type='text' />
            <input type='checkbox' onChange={handleSort} checked={sort} />
            <button type='submit'>Search</button>
          </div>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>
        {
          loading ? <div><p>Loading...</p></div> : <Movies movies={movies} />
        }

      </main>
    </div>

  )
}

export default App
