"use client"

import HorizontalCarousel from "@/app/HorizontalCarousel"
import MovieCard from "@/app/MovieCard"
import useStore from "@/store"
import { inter400 } from "@/fonts"
import { useEffect } from "react"

export default function NowPlaying() {
    let {nowPlaying, setNowPlaying, setMovieInfo, getMovieInfo} = useStore()

    useEffect(() => {
        if (nowPlaying !== undefined) {
            return // nothing to do
        }
        const storeData = async () => {
            await fetch("/api/home").then(x => x.json()).then(res => {
                // TODO: add setTrending and setTopRated
                let nowPlaying: any[] = Object.entries(res.nowPlaying)
                setNowPlaying(nowPlaying.map(x => x[0]))
                nowPlaying.forEach(x => setMovieInfo(x[0], x[1]))
            })
        }
        storeData()
    }, [])

    let nowPlayingList = nowPlaying?.map(getMovieInfo)

    return (
        <div className="flex flex-col     border-y border-red-500 border-dotted">
            <h2 className={`${inter400.className} text-xl`}>À l'affiche cette semaine</h2>
            <div className="pt-4">
                <HorizontalCarousel>
                    {nowPlayingList?.map(x => {
                        let src = x?.poster === undefined ? "" : `/api/image/w154/${x.poster}`
                        let name = x?.title === undefined ? "" : x.title
                        let duration = x?.runtime === undefined ? "" : `${Math.floor(x.runtime / 60)}h${x.runtime % 60}`
                        return <MovieCard src={src} name={name} duration={duration} />
                    })}
                </HorizontalCarousel>
            </div>
        </div>
    )
}
