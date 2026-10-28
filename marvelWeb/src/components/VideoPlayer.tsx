import type { Episode } from '../api/tvmazeApi'
import './VideoPlayer.css'

interface VideoPlayerProps {
  episode: Episode
  onBack: () => void
}

function VideoPlayer({ episode, onBack }: VideoPlayerProps) {

  async function sendPlaybackStatus(
    state: 'playing' | 'paused' | 'ended',
  ) {
    const video = document.querySelector('video')

    if (!video) return

    try {
      await fetch('http://localhost:3000/playback/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          video: episode.name,
          position: video.currentTime,
          state: state,
        }),
      })
    } catch (error) {
      console.error('Failed to send playback status:', error)
    }
  }

  function handlePlay() {
  console.log('[PLAY]', episode.name)
   void sendPlaybackStatus('playing')
  }

  function handlePause() {
    console.log('[PAUSE]', episode.name)
     void sendPlaybackStatus('paused')
  }

  function handleEnded() {
    console.log('[ENDED]', episode.name)
     void sendPlaybackStatus('ended')
  }
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
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
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