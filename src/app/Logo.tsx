"use client"

import Link from "next/link"
import { archivoNarrow700 } from "@/fonts"

export default function Logo() {
    return (
        <Link href="/" className={`${archivoNarrow700.className} text-4xl select-none`}>MOVIENIGHT</Link>
    )
}
