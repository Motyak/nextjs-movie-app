"use client"

import { archivo400, inter400 } from "@/fonts"
import Image from "next/image"

export default function DetailsCasting() {
    return (
        <div>
            <h2 className={`${inter400.className} text-xl`}>Casting</h2>
            <div className="flex flex-wrap gap-7 pt-4">
                <div>
                    <Image
                        src="/carrey.png"
                        width={160}
                        height={160}
                        alt="trailer"
                        loading="eager" // fix warning
                    />
                    <p className={`${inter400.className} text-lg pt-3`}>Jim Carrey</p>
                    <p className={`${archivo400.className} text-sm`} style={{color: "#9B9B9B"}}>Dr. Ivo Robotnik</p>
                </div>
            </div>
        </div>
    )
}
