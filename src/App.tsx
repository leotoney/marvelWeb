import { useEffect, useState } from 'react'
import Header from './components/Header'
import { getShows, type Show } from './api/tvmazeApi'
import ShowCard from './components/ShowCard'
import ShowDetails from './components/ShowDetails'

function App() {
  const [shows, setShows] = useState<Show[]>([])
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [searchText, setSearchText] = useState('')
  const [selectedShow, setSelectedShow] = useState<Show | null>(null)

  const genres = [
    'All',
    'Drama',
    'Comedy',
    'Action',
    'Adventure',
    'Crime',
    'Science-Fiction',
    'Thriller',
    'Romance',
    'Fantasy',
    'Horror',
    'Family'
  ]

  useEffect(() => {
    getShows().then((data) => {
      setShows(data)
    })
  }, [])

const filteredShows = shows.filter((show) => {
  const matchesGenre =
    selectedGenre === 'All' ||
    show.genres.includes(selectedGenre)

  const matchesSearch = show.name
    .toLowerCase()
    .includes(searchText.toLowerCase())

  return matchesGenre && matchesSearch
})
 
  return (
    <div>
      <Header />

      <main>
          {selectedShow ? (
          <ShowDetails
            show={selectedShow}
            onBack={() => setSelectedShow(null)}
          />
           ) : (
          <>
        <h2>TV Shows</h2>
        <input
          className="search-input"
            type="text"
            placeholder="Search TV shows..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        <div className="content-layout">
            <aside className="genre-sidebar">
              {genres.map((genre) => (
                <button
                  key={genre}
                  className={selectedGenre === genre ? 'active' : ''}
                  onClick={() => setSelectedGenre(genre)}
                >
                  {genre === 'All' ? 'All Shows' : genre}
                </button>
              ))}
            </aside>        

        <section className="shows-content">
           <div className="comic-grid">
              {filteredShows.map((show) => (
                <ShowCard
                  key={show.id}
                  title={show.name}
                  image={show.image?.medium ?? ''}
                  onClick={() => setSelectedShow(show)}
                />
              ))}
            </div>
          </section>
        </div>
        </>
        )}
      </main>
    </div>
  )
}

export default App