import {
  getShowById,
  getSeasons,
  getEpisodes,
  type Episode,
  type Show,
  type Season,
} from '../api/tvmazeApi'
import './ShowDetails.css'
import Episodes from './Episodes'
import { useEffect, useState } from 'react'
import VideoPlayer from './VideoPlayer'

interface ShowDetailsProps {
  show: Show
  onBack: () => void
}


function ShowDetails({ show, onBack }: ShowDetailsProps) {

    const [showDetails, setShowDetails] = useState<Show | null>(null)
    const [seasons, setSeasons] = useState<Season[]>([])
    const [selectedSeasonId, setSelectedSeasonId] = useState<number | null>(null)

    const [episodes, setEpisodes] = useState<Episode[]>([])
    const [showEpisodesPage, setShowEpisodesPage] = useState(false)

    const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null)

    const selectedSeason = seasons.find(
    (season) => season.id === selectedSeasonId
    )

    const selectedEpisodes = episodes.filter(
    (episode) => episode.season === selectedSeason?.number
    )

    useEffect(() => {
    getShowById(show.id).then((data) => {
        setShowDetails(data)
    })
    }, [show.id])

    useEffect(() => {
    getSeasons(show.id).then((data) => {
        setSeasons(data)
    })
    }, [show.id])

    useEffect(() => {
    getEpisodes(show.id).then((data) => {
    setEpisodes(data)
    })
    }, [show.id])

    if (!showDetails) {
    return <p>Loading show details...</p>
    }

    if (selectedEpisode) {
    return (
        <VideoPlayer
        episode={selectedEpisode}
        onBack={() => setSelectedEpisode(null)}
        />
    )
    }

    if (showEpisodesPage && selectedSeason) {
    return (
        <Episodes
        season={selectedSeason}
        episodes={selectedEpisodes}
        onBack={() => setShowEpisodesPage(false)}
        onEpisodeClick={(episode) => setSelectedEpisode(episode)}
        />
    )
    }

    return (
    <div>
        <button className="back-button" onClick={onBack}>
        <span className="back-arrow">←</span>
        Back to Shows
        </button>
        <div className="show-details">
        <div className="show-details-poster">
            {showDetails.image && (
            <img
                src={showDetails.image.original}
                alt={showDetails.name}
            />
            )}
        </div>

        <div className="show-details-content">
            <h2>{showDetails.name}</h2>

            <p>
            <strong>Rating:</strong>{' '}
            {showDetails.rating.average ?? 'Not rated'}
            </p>

            <p>
            <strong>Genres:</strong>{' '}
            {showDetails.genres.join(', ') || 'Not available'}
            </p>

            <div>
            <strong>Summary:</strong>
            <div
                dangerouslySetInnerHTML={{
                __html: showDetails.summary ?? 'No summary available.',
                }}
            />
            </div>
        </div>
        </div>


        <div className="seasons-section">
            <h2>Seasons</h2>

            {seasons.length === 0 ? (
                <p>No seasons available.</p>
            ) : (
                <div className="seasons-list">
                    {seasons.map((season) => (
                        <div
                            className={`season-card ${selectedSeasonId === season.id ? 'selected' : ''}`}
                            key={season.id}
                           onClick={() => {
                            setSelectedSeasonId(season.id)
                            setShowEpisodesPage(true)
                            }}
>
                            <div className="season-card-content">
                                <h3>
                                {season.name || `Season ${season.number}`}
                                </h3>

                                <p>
                                <strong>Episodes:</strong>{' '}
                                {season.episodeOrder ?? 'Unknown'}
                                </p>

                                <p>
                                <strong>Premiere:</strong>{' '}
                                {season.premiereDate ?? 'Unknown'}
                                </p>
                            </div>

                            {season.image && (
                                <img
                                className="season-thumbnail"
                                src={season.image.medium}
                                alt={season.name || `Season ${season.number}`}
                                />
                            )}
                            </div>
                    ))}
                </div>
            )}
        </div>
        
    </div>
    )
}

export default ShowDetails