"use client"

import Link from "next/link"
import useStore from "@/store"
import { archivoNarrow700 } from "@/fonts"

export default function Logo() {
    let {setSearchValue} = useStore()
    let onClick = () => setSearchValue("")

    return (
        <Link href="/" onClick={onClick} className={`${archivoNarrow700.className} text-4xl select-none`}>MOVIENIGHT</Link>
    )
}
