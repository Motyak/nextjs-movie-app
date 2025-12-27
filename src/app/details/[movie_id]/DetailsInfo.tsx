"use client"

import Image from "next/image"
import useStore from "@/store"

export default function DetailsInfo({movie_id}: {movie_id: number}) {
    let {getMovieInfo} = useStore()
    let movieInfo = getMovieInfo(movie_id)

    return (
        <div className="flex">
            <div className="w-1/2 flex flex-col">
                <p>test</p>
            </div>
            <Image
                src={movieInfo?.poster ?? ""}
                width={436}
                height={654}
                alt="poster"
                loading="eager" // fix warning
            />
        </div>
    )
}
