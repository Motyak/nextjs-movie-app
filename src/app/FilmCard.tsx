"use client"

import Image from "next/image"

export default function FilmCard() {
    return (
        <div>
            <Image
                src="/sonic_poster.png"
                width={140}
                height={200}
                alt=""
            />
        </div>
    )
}