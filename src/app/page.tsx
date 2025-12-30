"use client"

import HorizontalCarousel from "@/app/HorizontalCarousel"
import MovieCard from "@/app/MovieCard"
import useStore from "@/store"
import { inter400 } from "@/fonts"
import { useEffect } from "react"
import MovieInfo from "@/app/MovieInfo"
// import VerticalCarousel from "@/app/VerticalCarousel"
import Image from "next/image"

const TrendingHero = () => {
    let {trending, getMovieInfo} = useStore()
    let trendingTable = trending?.map(id => ({id, movieInfo: getMovieInfo(id)}))

    return (
        <div className="pt-4 relative" style={{height: "300px"}}>
            {/* <VerticalCarousel> */}
                <Image
                    src="/backdrop.jpg"
                    alt="backdrop"
                    loading="eager" // fix warning
                    layout="fill"
                    objectFit="cover"
                    style={{objectPosition: "center"}}
                />
                {/* {trendingTable?.map(x => {
                    let {id, movieInfo} = x
                    let src = movieInfo?.poster === undefined ? "" : `/api/image/w154/${movieInfo.poster}`
                    let name = movieInfo?.title === undefined ? "" : movieInfo.title
                    let releaseYear = movieInfo?.releaseYear === undefined ? "" : movieInfo.releaseYear
                    return <MovieBanner src={src} name={name} releaseYear={releaseYear} id={id} />
                })} */}
            {/* </VerticalCarousel> */}
        </div>
    )
}

const NowPlaying = () => {
    let {nowPlaying, getMovieInfo} = useStore()
    let nowPlayingTable = nowPlaying?.map(id => ({id, movieInfo: getMovieInfo(id)}))

    return (
        <div className="flex flex-col">
            <h2 className={`${inter400.className} text-xl`}>À l'affiche cette semaine</h2>
            <div className="pt-4">
                <HorizontalCarousel>
                    {nowPlayingTable?.map(x => {
                        let {id, movieInfo} = x
                        let src = movieInfo?.poster === undefined ? "" : `/api/image/w154/${movieInfo.poster}`
                        let name = movieInfo?.title === undefined ? "" : movieInfo.title
                        let duration = movieInfo?.runtime === undefined ? ""
                            : movieInfo.runtime === 0 ? ""
                            : movieInfo.runtime < 60? `${movieInfo.runtime}m`
                            : `${Math.floor(movieInfo.runtime / 60)}h` + `${movieInfo.runtime % 60}`.padStart(2, "0")
                        return <MovieCard src={src} name={name} duration={duration} id={id} />
                    })}
                </HorizontalCarousel>
            </div>
        </div>
    )
}

const TopRated = () => {
    let {topRated, getMovieInfo} = useStore()
    let topRatedTable = topRated?.map(id => ({id, movieInfo: getMovieInfo(id)}))

    return (
        <div className="flex flex-col">
            <h2 className={`${inter400.className} text-xl`}>Les films les mieux notés</h2>
            <div className="pt-4">
                <HorizontalCarousel>
                    {topRatedTable?.map(x => {
                        let {id, movieInfo} = x
                        let src = movieInfo?.poster === undefined ? "" : `/api/image/w154/${movieInfo.poster}`
                        let name = movieInfo?.title === undefined ? "" : movieInfo.title
                        let rating = movieInfo?.rating === undefined ? 0 : movieInfo.rating
                        return <MovieCard src={src} name={name} rating={rating} id={id} />
                    })}
                </HorizontalCarousel>
            </div>
        </div>
    )
}

export default function Home() {
    let {nowPlaying, setNowPlaying, setTopRated, setMovieInfo} = useStore()

    useEffect(() => {
        if (nowPlaying !== undefined) {
            return // nothing to do
        }
        const storeData = async () => {
            await fetch("/api/home").then(x => x.json()).then(res => {
                // TODO: add setTrending
                let topRated: {movieId: number, movieInfo: MovieInfo}[] = res.topRated
                let nowPlaying: {movieId: number, movieInfo: MovieInfo}[] = res.nowPlaying

                setNowPlaying(nowPlaying.map(x => x.movieId))
                setTopRated(topRated.map(x => x.movieId))

                nowPlaying.forEach(x => setMovieInfo(x.movieId, x.movieInfo))
                topRated.forEach(x => setMovieInfo(x.movieId, x.movieInfo))
            })
        }
        storeData()
    }, [])

    return (
        <div className="flex justify-center pt-6">
            <div className="flex flex-col w-5/6 2xl:w-3/5 gap-10">
                <TrendingHero />
                <NowPlaying />
                <TopRated />
            </div>
        </div>
    )
}
