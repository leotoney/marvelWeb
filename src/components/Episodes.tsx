import type { Episode, Season } from '../api/tvmazeApi'
import './ShowDetails.css'
import './Episodes.css'

interface EpisodesProps {
  season: Season
  episodes: Episode[]
  onBack: () => void
}

function Episodes({ season, episodes, onBack }: EpisodesProps) {
  return (
    <div>
      <button className="back-button" onClick={onBack}>
        <span className="back-arrow">←</span>
        Back to Seasons
      </button>

      <h2>{season.name || `Season ${season.number}`} Episodes</h2>

      <div className="episodes-grid">
        {episodes.map((episode) => (
          <div className="episode-card" key={episode.id}>
            {episode.image && (
              <img src={episode.image.medium} alt={episode.name} />
            )}

            <h3>
              {episode.number != null
                ? `Episode ${episode.number}: ${episode.name}`
                : episode.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Episodes