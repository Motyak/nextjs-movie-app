"use client"

import { inter400 } from "@/fonts"

export default function RatingBar({value}: {value: number}) {
    let percentage = value <= 0 ? 0 : value >= 100 ? 100 : Math.round(value > 1 ? value : value * 100)
    let bgColorClass = percentage < 40 ? "bg-red-500" : percentage < 70 ? "bg-yellow-600" : "bg-green-500"
    const BAR_FULL_WIDTH_PX = 80
    let ratingBarWidthPx = Math.round(BAR_FULL_WIDTH_PX / 100 * percentage)
    if (ratingBarWidthPx < BAR_FULL_WIDTH_PX - 5) {
        ratingBarWidthPx += 5 // to compensate rounded border
    }

    return (
        <div className="flex flex-row items-center">
            <div className="bg-black rounded" style={{width: "80px", height: "8px"}}>
                <div className={`${bgColorClass} rounded`} style={{width: `${ratingBarWidthPx}px`, height: "8px"}}></div>
            </div>
            <p className={`${inter400.className} text-xs pl-1.5`} style={{color: "#9B9B9B"}}>{percentage}%</p>
        </div>
    )
}
