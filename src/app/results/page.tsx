import MovieCard from "../MovieCard"
import { archivo400, archivoBlack400 } from "@/fonts"
import { SearchParams, getSearchParam } from "@/utils/searchparams"

type ResultsFoundProp = {
    searchQuery: string,
    nbOfResults: number
}

const ResultsFound = ({searchQuery, nbOfResults}: ResultsFoundProp) => {
    let displayNbOfResults = `${nbOfResults} résultat` + (nbOfResults < 2? "" : "s")
    
    return (
        <h1 className="flex flex-col          border-y border-red-500 border-dotted">
            <span className={`${archivoBlack400.className} text-4xl`}>{searchQuery}</span>
            <span className={`${archivo400.className} text-4xl`}>{displayNbOfResults}</span>
        </h1>
    )
}

const ResultGrid = ({children}: Readonly<{children: React.ReactNode}>) => {
    return (
        <div className="flex flex-wrap gap-6            border-y border-green-500 border-dotted">
            {children}
        </div>
    )
}

export default async function Results({searchParams}: {searchParams: SearchParams}) {
    let searchQuery = await getSearchParam(searchParams, "q") ?? ""
    return (
        <div className="flex justify-center pt-6">
            <div className="flex flex-col w-full 2xl:w-3/4 px-4 gap-10">
                <ResultsFound searchQuery={searchQuery} nbOfResults={54} />
                <ResultGrid>
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" id={123} />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                </ResultGrid>
            </div>
        </div>
    )
}
