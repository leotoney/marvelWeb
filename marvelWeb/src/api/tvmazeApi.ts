export interface Show {
  id: number
  name: string
  image: {
    medium: string
    original: string
  } | null
  summary: string | null
  genres: string[]
  rating: {
    average: number | null
  }
}

export interface Episode {
  id: number
  name: string
  season: number
  number: number | null
  summary: string | null
  image: {
    medium: string
    original: string
  } | null
  airdate: string | null
  runtime: number | null
}

export interface Season {
  id: number
  number: number
  name: string
  episodeOrder: number | null
  premiereDate: string | null
  endDate: string | null
}

export async function getShows(): Promise<Show[]> {
  const response = await fetch('https://api.tvmaze.com/shows')

  if (!response.ok) {
    throw new Error('Failed to fetch shows')
  }

  return response.json()
}

export async function getShowById(id:number) : Promise<Show> {
  const response = await fetch(`https://api.tvmaze.com/shows/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch show details')
  }

  return response.json()
}

export async function getSeasons(showId: number): Promise<Season[]> {
  const response = await fetch(
    `https://api.tvmaze.com/shows/${showId}/seasons`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch seasons')
  }

  return response.json()
}

export async function getEpisodes(showId: number): Promise<Episode[]> {
  const response = await fetch(
    `https://api.tvmaze.com/shows/${showId}/episodes`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch episodes')
  }

  return response.json()
}