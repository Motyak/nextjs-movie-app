"use client"

import { inter400 } from "@/fonts"
import Image from "next/image"

export default function DetailsVideo() {
    return (
        <div>
            <h2 className={`${inter400.className} text-xl`}>Bandes annonces</h2>
            <div className="flex flex-wrap gap-7 pt-4">
                <Image
                    src="/sonic_trailer.png"
                    width={344}
                    height={193}
                    alt="trailer"
                    loading="eager" // fix warning
                />
            </div>
        </div>
    )
}
