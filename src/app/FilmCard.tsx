"use client"

import Image from "next/image"
import { archivo400, inter400 } from "@/fonts"

export default function FilmCard() {
    return (
        <div className="flex flex-col">
            <Image
                src="/sonic_poster.png"
                width={140}
                height={200}
                alt="poster"
            />
            <h3 className={`${inter400.className} pt-2`}>Sonic 2, le film</h3>
            <p className={`${archivo400.className} text-sm -mt-0.5`} style={{color: "#9B9B9B"}}>1h48</p>
        </div>
    )
}