type MovieInfo = {
    // id: number

    title: string
    releaseYear: number
    runtime: number
    rating: number // between 0 and 1
    genres: string[]
    synopsis: string

    poster: string // e.g.: 8nytsqL59SFJTVYVrN72k6qkGgJ.jpg
    videos: string[] // YouTube keys, e.g.: tZpXdiB_pg0

    crew: {
        name: string,
        job: string,
    }[],

    casting: {
        name: string
        character: string
        photo: string // e.g.: 8nytsqL59SFJTVYVrN72k6qkGgJ.jpg
    }[],
}

export default MovieInfo
