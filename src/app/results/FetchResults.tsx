"use client"

import { archivo400, archivoBlack400 } from "@/fonts"
import MovieCard from "@/app/MovieCard"
import useStore, { SearchResult } from "@/store"
import { useEffect } from "react"

type ResultsFoundProp = {
    searchQuery: string,
    nbOfResults: number
}

const ResultsFound = ({searchQuery, nbOfResults}: ResultsFoundProp) => {
    let displayNbOfResults = `${nbOfResults} résultat` + (nbOfResults < 2? "" : "s")
    
    return (
        <h1 className="flex flex-col">
            <span className={`${archivoBlack400.className} text-4xl`}>{searchQuery}</span>
            <span className={`${archivo400.className} text-4xl`}>{displayNbOfResults}</span>
        </h1>
    )
}

const ResultGrid = ({children}: Readonly<{children: React.ReactNode}>) => {
    return (
        <div className="flex flex-wrap gap-6">
            {children}
        </div>
    )
}

export default function FetchResults({searchQuery}: {searchQuery: string}) {
    let {getSearchResult, setSearchResult} = useStore()
    useEffect(() => {
        if (getSearchResult(searchQuery) !== undefined) {
            return // nothing to do
        }
        const storeData = async () => {
            await fetch(`/api/results?q=${encodeURIComponent(searchQuery ?? "")}`)
                .then(x => x.json())
                .then(searchResult => setSearchResult(searchQuery, searchResult))
        }
        storeData()
    }, [searchQuery])

    let searchResult = getSearchResult(searchQuery)
    if (searchResult === undefined) {
        return
    }

    let results = searchResult.results

    return (
        <div className="flex justify-center pt-6">
            <div className="flex flex-col w-full 2xl:w-3/4 px-4 gap-10">
                <ResultsFound searchQuery={searchQuery} nbOfResults={searchResult.nbOfResults} />
                <ResultGrid>
                    {results.map(x => {
                        let {movieId, movieInfo} = x
                        let src = `/api/image/w154/${movieInfo.poster}`
                        let name = movieInfo.title
                        let duration = movieInfo.runtime === 0 ? ""
                            : movieInfo.runtime < 60? `${movieInfo.runtime}m`
                            : `${Math.floor(movieInfo.runtime / 60)}h` + `${movieInfo.runtime % 60}`.padStart(2, "0")
                        return <MovieCard key={movieId} src={src} name={name} duration={duration} id={Number(movieId)} />
                    })}
                </ResultGrid>
            </div>
        </div>
    )
}
