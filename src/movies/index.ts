'use server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { revalidatePath } from 'next/cache'

import { posterURL } from './utils'

export async function searchMovies(query: string) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      query,
    )}&include_adult=false&language=en-US&page=1&api_key=${process.env.TMDB_API_KEY}`,
  )
  const { results } = await response.json()
  return results
    .map(({ id, poster_path, title }: { id: string; poster_path: string; title: string }) => ({
      id,
      poster_path,
      title,
    }))
    .filter(({ poster_path }: { poster_path: string }) => !!poster_path)
}

export async function addMovieAction(movieId: number) {
  const payload = await getPayloadHMR({ config: configPromise })

  const movieDataReq = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=${process.env.TMDB_API_KEY}`,
  )
  const { title, poster_path, overview, tagline, genres: genreObjects } = await movieDataReq.json()
  const genres = genreObjects.map(({ name }: { name: string }) => ({ name }))

  const response = await fetch(posterURL(poster_path))
  const arrayBuffer = await response.arrayBuffer()
  const posterBuffer = Buffer.from(arrayBuffer)

  const posterMedia = await payload.create({
    collection: 'media',
    data: {
      text: `${title} Poster`,
    },
    file: {
      data: posterBuffer,
      name: `${movieId}.jpg`,
      mimetype: 'image/jpeg',
      size: posterBuffer.byteLength,
    },
  })

  const movie = await payload.create({
    collection: 'movies',
    data: {
      name: title,
      url: `https://www.themoviedb.org/movie/${movieId}`,
      votes: 0,
      poster: posterMedia.id,
      overview,
      tagline,
      genres,
    },
  })

  revalidatePath('/')

  return movie
}

export async function addVote(movieId: number) {
  const payload = await getPayloadHMR({ config: configPromise })

  const movie = await payload.findByID({
    collection: 'movies',
    id: movieId,
  })

  await payload.update({
    collection: 'movies',
    id: movieId,
    data: {
      votes: movie.votes + 1,
    },
  })

  const movies = await payload.find({
    collection: 'movies',
    sort: '-votes',
  })
  return movies.docs
}
