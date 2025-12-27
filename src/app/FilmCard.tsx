"use client"

import Image from "next/image"
import { archivo400, inter400 } from "@/fonts"
import RatingBar from "./RatingBar"

interface FilmCardProp {
    src: string,
    name: string,
    duration?: string | undefined,
    rating?: number | undefined,
}

export default function FilmCard({src, name, duration, rating}: FilmCardProp) {
    return (
        <div className="flex flex-col" style={{width: "140px"}}>
            <Image
                src={src}
                width={140}
                height={200}
                alt="poster"
                loading="eager" // fix warning
            />
            <h3 className={`${inter400.className} pt-2 break-words`}>{name}</h3>
            {duration !== undefined ?
                <p className={`${archivo400.className} text-sm -mt-0.5`} style={{color: "#9B9B9B"}}>{duration}</p>
                : <></>
            }
            {rating !== undefined ?
                <RatingBar value={rating} />
                : <></>
            }
        </div>
    )
}