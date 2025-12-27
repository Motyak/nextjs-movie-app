import { archivo400, archivoBlack400 } from "@/fonts"
import FilmCard from "../FilmCard"

type SearchParams = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const ResultsFound = () => {
    return (
        <h1 className="flex flex-col          border-y border-red-500 border-dotted">
            <span className={`${archivoBlack400.className} text-4xl`}>so</span>
            <span className={`${archivo400.className} text-4xl`}>154 résultats</span>
        </h1>
    )
}

const ResultGrid = () => {
    return (
        <div className="flex flex-wrap gap-6            border-y border-green-500 border-dotted">
            <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
            <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
            <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
            <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
            <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
            <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
            <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
            <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
            <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
            <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
            <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
            <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
            <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
            <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
            <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
            <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
            <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
            <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
            <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
            <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
            <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
            <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
            <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
            <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
            <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
            <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
            <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
            <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
        </div>
    )
}

export default async function Results({searchParams}: SearchParams) {
    let searchQuery = (await searchParams).q
    // return (
    //     <div className="border border-red-500 border-dotted">{searchQuery}</div>
    // )
    return (
        <div className="flex justify-center pt-6">
            <div className="flex flex-col w-full 2xl:w-3/4 px-4 gap-10">
                <ResultsFound />
                <ResultGrid />
            </div>
        </div>
    )
}
