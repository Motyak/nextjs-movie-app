"use client"

import { archivo400, archivoBlack400 } from "@/fonts"
import MovieCard from "@/app/MovieCard"
import useStore from "@/store"
import { useEffect, useRef } from "react"
import { Spinner } from "baseui/spinner"
import { withStyle } from "baseui"

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

const CustomSpinner = withStyle(Spinner, {
    width: "40px",
    height: "40px",
    borderTopColor: "white",
    borderLeftColor: "gray",
    borderBottomColor: "gray",
    borderRightColor: "gray",
})

export default function FetchResults({searchQuery}: {searchQuery: string}) {
    let {
        searchResults, getSearchResult, setSearchResult,
        getMovieInfo, setMovieInfo,
    } = useStore()
    let spinnerRef = useRef<HTMLDivElement>(null)

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

        if (!spinnerRef.current) {
            return
        }

        /* infinite scrolling */
        if (searchResult.fetchedResults.length < searchResult.nbOfPages) {
            let nextPage = searchResult.fetchedResults.length + 1
            const onVisible = (entries: any, observer: any) => {
                entries.forEach((entry: any) => {
                    if (entry.isIntersecting) {
                        const storeData = async () => {
                            await fetch(`/api/results?q=${encodeURIComponent(searchQuery)}&page=${nextPage}`)
                                .then(x => x.json())
                                .then(x => {
                                    let currSearchRes = getSearchResult(searchQuery)
                                    if (currSearchRes === undefined) {
                                        return
                                    }
                                    setSearchResult(searchQuery, {
                                        nbOfResults: x.nbOfResults,
                                        nbOfPages: x.nbOfPages,
                                        fetchedResults: [...currSearchRes.fetchedResults, x.movieIds]
                                    })
                                })
                        }
                        storeData()
                        observer.unobserve(entry.target)
                    }
                })
            }
            let observer = new IntersectionObserver(onVisible, {threshold: 0.1})
            observer.observe(spinnerRef.current)
        }
        else {
            spinnerRef.current.hidden = true
        }

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
                    {searchResult.fetchedResults.map(page => page.map(movieId => {
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
                    }))}
                    <span id="spinner" className="relative" style={{width: "140px", height: "210px"}}>
                        <CustomSpinner ref={spinnerRef} className="absolute inset-0 m-auto" />
                    </span>
                </ResultGrid>
            </div>
        </div>
    )
}
