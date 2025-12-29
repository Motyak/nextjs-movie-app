"use client"

import { archivo400, inter400 } from "@/fonts"
import useStore from "@/store"
import Image from "next/image"

export default function DetailsCasting({movie_id}: {movie_id: number}) {
    let {getMovieInfo} = useStore()
    let movieInfo = getMovieInfo(movie_id)

    return (
        <div>
            <h2 className={`${inter400.className} text-xl`}>Casting</h2>
            <div className="flex flex-wrap gap-7 pt-4">
                {movieInfo?.casting.filter(cast => cast.photo !== null).map(cast => (
                    <div key={cast.name}>
                        <Image
                            src={`/api/image/w185/${cast.photo}`}
                            width={160}
                            height={160}
                            alt="photo"
                            loading="eager" // fix warning
                        />
                        <p className={`${inter400.className} text-lg pt-3`}>{cast.name}</p>
                        <p className={`${archivo400.className} text-sm`} style={{color: "#9B9B9B"}}>{cast.character}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
