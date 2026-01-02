"use client"

import { archivo400, archivoBlack400 } from "@/fonts"
import MovieCard from "@/app/MovieCard"
import useStore from "@/store"
import { useEffect } from "react"

type ResultsFoundProp = {
    searchQuery: string,
    nbOfResults: number
}

const ResultsFound = ({searchQuery, nbOfResults}: ResultsFoundProp) => {
    let displayNbOfResults = `${nbOfResults} résultat` + (nbOfResults < 2? "" : "s")
    
    return (
        <h1 className="flex flex-col">
            <span className={`${archivoBlack400.className} text-4xl lowercase`}>{searchQuery}</span>
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
    let {
        searchResults, getSearchResult, setSearchResult,
        getMovieInfo, setMovieInfo,
    } = useStore()

    useEffect(() => {
        if (getSearchResult(searchQuery) === undefined) {
            const storeData = async () => {
                await fetch(`/api/results?q=${encodeURIComponent(searchQuery)}&page=1`)
                    .then(x => x.json())
                    .then(x => setSearchResult(searchQuery, {
                        nbOfResults: x.nbOfResults,
                        nbOfPages: x.nbOfPages,
                        fetchedResults: [x.movieIds]
                    }))
            }
            storeData()
            return
        }
        let searchResult = getSearchResult(searchQuery)
        if (searchResult === undefined) {
            return
        }
        searchResult.fetchedResults.at(-1)?.map((movieId) => {
            if (getMovieInfo(movieId) === undefined) {
                const storeData = async () => {
                    await fetch(`/api/details/${movieId}`)
                        .then(x => x.json())
                        .then(movieInfo => setMovieInfo(movieId, movieInfo))
                }
                storeData()
            }
        })

        // searchResult.fetchedResults.length
        // searchResult.nbOfPages

    }, [searchQuery, searchResults])

    let searchResult = getSearchResult(searchQuery)
    if (searchResult === undefined) {
        return
    }

    return (
        <div className="flex justify-center pt-6">
            <div className="flex flex-col w-full 2xl:w-3/4 px-4 gap-10">
                <ResultsFound searchQuery={searchQuery} nbOfResults={searchResult.nbOfResults} />
                <ResultGrid>
                    {searchResult.fetchedResults.at(-1)?.map(movieId => {
                        let movieInfo = getMovieInfo(movieId)
                        if (movieInfo === undefined) {
                            return
                        }

                        let src = `/api/image/w300/${movieInfo.poster}`
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
