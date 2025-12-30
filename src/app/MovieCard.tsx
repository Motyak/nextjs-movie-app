"use client"

import Image from "next/image"
import Link from "next/link"
import { archivo400, inter400 } from "@/fonts"
import RatingBar from "./RatingBar"

interface MovieCardProp {
    src: string
    name: string
    duration?: string | undefined
    rating?: number | undefined
    id?: number | undefined
}

export default function MovieCard({src, name, duration, rating, id}: MovieCardProp) {
    let href = id !== undefined? `/details/${id}` : ""
    return (
        <div className="flex flex-col" style={{width: "140px"}}>
            <div className="relative" style={{height: "210px"}}>
                <Image
                    src={src}
                    layout="fill"
                    objectFit="cover"
                    alt="poster"
                    loading="eager" // fix warning
                />
            </div>
            <Link href={href}><h3 className={`${inter400.className} pt-2 break-words hover:underline`}>{name}</h3></Link>
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