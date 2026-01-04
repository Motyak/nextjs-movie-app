"use client"

import useStore from "@/store"

export default function DetailsHero({movie_id}: {movie_id: number}) {
    let {getMovieInfo} = useStore()
    let movieInfo = getMovieInfo(movie_id)
    if (movieInfo === undefined) {
        return
    }
    let backgroundCss = movieInfo.poster === undefined ? ""
        : `url(/api/image/w500/${movieInfo.backdrop}) center / cover`

    return (
        <span className="absolute inset-0 z-[-1]" style={{
            height: "600px",
            background: `linear-gradient(rgba(42, 42, 42, 0) 39.63%, #2A2A2A 100%), ${backgroundCss}`,
            filter: "blur(50px)",
        }}></span>
    )
}
