"use client"

import { inter400 } from "@/fonts"
import useStore from "@/store"
import Image from "next/image"

export default function DetailsVideo({movie_id}: {movie_id: number}) {
    let {getMovieInfo} = useStore()
    let movieInfo = getMovieInfo(movie_id)

    return (
        <div>
            <h2 className={`${inter400.className} text-xl`}>Bandes annonces</h2>
            <div className="flex flex-wrap gap-7 pt-4">
                {movieInfo?.videos.map(video => (
                    <iframe
                        key={video}
                        src={`https://www.youtube.com/embed/${video}`}
                        width={344}
                        height={193}
                        allowFullScreen
                    />
                ))}
                
            </div>
        </div>
    )
}
