type MovieInfo = {
    // id: number

    title: string
    releaseYear: number
    runtime: number
    rating: number
    genres: string[]
    synopsis: string

    poster: string
    videos: string[]

    casting: {
        photo: string
        name: string
        character: string
    }[],
}

export default MovieInfo
