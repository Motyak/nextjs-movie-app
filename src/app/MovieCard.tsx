"use client"

import Link from "next/link"
import { archivo400, inter400 } from "@/fonts"
import RatingBar from "./RatingBar"
import OptionalImage from "@/utils/OptionalImage"
import OptionalLink from "@/utils/OptionalLink"

interface MovieCardProp {
    src?: string
    name?: string
    duration?: string
    rating?: number
    id?: number
}

export default function MovieCard({src, name, duration, rating, id}: MovieCardProp) {
    let href = id === undefined ? undefined : `/details/${id}`
    return (
        <div className="flex flex-col" style={{width: "140px"}}>
            <OptionalLink href={href}>
                <div className="relative" style={{height: "210px"}}>
                    <OptionalImage
                        src={src}
                        layout="fill"
                        objectFit="cover"
                        alt="poster"
                        loading="eager" // fix warning
                    />
                </div>
            </OptionalLink>
            {href === undefined ? (
                <h3 className={`${inter400.className} pt-2 break-words`}>{name}</h3>
            ) : (
                <Link href={href} className="w-fit max-w-full">
                    <h3 className={`${inter400.className} pt-2 break-words hover:underline`}>{name}</h3>
                </Link>
            )}
            {duration === undefined ? <></> :
                <p className={`${archivo400.className} text-sm -mt-0.5`} style={{color: "#9B9B9B"}}>{duration}</p>
            }
            {rating === undefined ? <></> :
                <RatingBar value={rating} />
            }
        </div>
    )
}