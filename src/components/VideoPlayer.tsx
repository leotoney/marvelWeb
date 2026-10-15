import type { Episode } from '../api/tvmazeApi'
import './VideoPlayer.css'

interface VideoPlayerProps {
  episode: Episode
  onBack: () => void
}


function VideoPlayer({ episode, onBack }: VideoPlayerProps) {
  return (
    <div className="video-player-page">
      <button className="back-button" onClick={onBack}>
        ← Back to Episodes
      </button>

      <h2>{episode.name}</h2>

      <div className="video-container">
        <video
        controls
        autoPlay
        poster={episode.image?.original ?? undefined}
        src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
        >
        Your browser does not support video playback.
        </video>
      </div>

      <div
        className="episode-summary"
        dangerouslySetInnerHTML={{
          __html: episode.summary ?? 'No summary available.',
        }}
      />
    </div>
  )
}

export default VideoPlayer