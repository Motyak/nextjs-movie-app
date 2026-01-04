"use client"

import HorizontalCarousel from "@/app/HorizontalCarousel"
import MovieCard from "@/app/MovieCard"
import useStore from "@/store"
import { archivo400, archivoBlack400, inter400 } from "@/fonts"
import { useEffect } from "react"
import MovieInfo from "@/app/MovieInfo"
import { Button, KIND } from "baseui/button"
import Link from "next/link"
import OptionalImage from "@/utils/OptionalImage"

// blurred hero background
const HomeHero = () => {
    let {trending, getMovieInfo} = useStore()
    if (trending === undefined) {
        return
    }
    let trendingMovie = getMovieInfo(trending.at(0) ?? -1)
    let backgroundCss = trendingMovie?.backdrop === undefined ? ""
        : `url(/api/image/w300/${trendingMovie.backdrop}) center / cover`

    return (
        <span className="absolute inset-0 z-[-1]" style={{
            height: "600px",
            background: `linear-gradient(rgba(42, 42, 42, 0) 39.63%, #2A2A2A 100%), ${backgroundCss}`,
            filter: "blur(50px)",
        }}></span>
    )
}

const Trending = () => {
    let {trending, getMovieInfo} = useStore()
    if (trending === undefined) {
        return
    }

    let trendingMovie = getMovieInfo(trending.at(0) ?? -1)
    let src = trendingMovie?.backdrop == undefined ? undefined
        : `/api/image/w1280/${trendingMovie.backdrop}`
    let href = `/details/${trending.at(0) ?? -1}`

    return (
        <div className="mt-4 relative rounded-lg" style={{height: "300px", boxShadow: "0px 0px 48px rgba(0, 0, 0, 1)"}}>
            <OptionalImage
                src={src}
                alt="backdrop"
                loading="eager" // fix warning
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                style={{objectPosition: "center"}}
            />

            <div className="flex flex-col gap-3 absolute bottom-0 left-0 pl-4 mb-6 shadowOverlay">
                {/* text */}
                {trendingMovie?.title === undefined ? <></> :
                    <h1 className="text-4xl uppercase" >
                        <span className={`${archivoBlack400.className}`}>{trendingMovie.title}</span>
                        {trendingMovie.releaseYear == undefined ? <></> :
                            <span className={`${archivo400.className}`}>{` (${trendingMovie.releaseYear})`}</span>
                        }
                    </h1>
                }

                {/* buttons */}
                <div className="flex gap-2">
                    <Button kind={KIND.secondary} style={{borderRadius: "4px", width: "107px", height: "36px"}} >
                        <p className={`${archivo400.className}`}>Regarder</p>
                    </Button>
                    <div className="border border-white rounded" style={{width: "139px", height: "36px"}}>
                        <Link href={href}>
                            <Button colors={{backgroundColor: "#FFFFFF00", color: "#FFFFFF"}} style={{borderRadius: "4px", width: "139px", height: "33px"}}>
                                <p className={`${archivo400.className}`}>En savoir plus</p>
                            </Button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

const NowPlaying = () => {
    let {nowPlaying, getMovieInfo} = useStore()
    if (nowPlaying === undefined) {
        return
    }
    let nowPlayingTable = nowPlaying.map(id => ({id, movieInfo: getMovieInfo(id)}))

    return (
        <div className="flex flex-col">
            <h2 className={`${inter400.className} text-xl`}>À l'affiche cette semaine</h2>
            <div className="pt-4">
                <HorizontalCarousel>
                    {nowPlayingTable?.map(x => {
                        let {id, movieInfo} = x
                        let src = movieInfo?.poster === undefined ? undefined : `/api/image/w300/${movieInfo.poster}`
                        let name = movieInfo?.title ?? undefined
                        let duration = movieInfo?.runtime === undefined ? undefined
                            : movieInfo.runtime === 0 ? undefined
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
    if (topRated === undefined) {
        return
    }
    let topRatedTable = topRated.map(id => ({id, movieInfo: getMovieInfo(id)}))

    return (
        <div className="flex flex-col">
            <h2 className={`${inter400.className} text-xl`}>Les films les mieux notés</h2>
            <div className="pt-4">
                <HorizontalCarousel>
                    {topRatedTable?.map(x => {
                        let {id, movieInfo} = x
                        let src = movieInfo?.poster === undefined ? undefined : `/api/image/w300/${movieInfo.poster}`
                        let name = movieInfo?.title ?? undefined
                        let rating = movieInfo?.rating === undefined ? undefined : movieInfo.rating
                        return <MovieCard src={src} name={name} rating={rating} id={id} />
                    })}
                </HorizontalCarousel>
            </div>
        </div>
    )
}

export default function Home() {
    let {nowPlaying, setTrending, setNowPlaying, setTopRated, setMovieInfo} = useStore()

    useEffect(() => {
        if (nowPlaying !== undefined) {
            return
        }
        const storeData = async () => {
            await fetch("/api/home").then(x => x.json()).then(res => {
                let trending: {movieId: number, movieInfo: MovieInfo}[] = res.trending
                let topRated: {movieId: number, movieInfo: MovieInfo}[] = res.topRated
                let nowPlaying: {movieId: number, movieInfo: MovieInfo}[] = res.nowPlaying

                setTrending(trending.map(x => x.movieId))
                setNowPlaying(nowPlaying.map(x => x.movieId))
                setTopRated(topRated.map(x => x.movieId))

                trending.forEach(x => setMovieInfo(x.movieId, x.movieInfo))
                nowPlaying.forEach(x => setMovieInfo(x.movieId, x.movieInfo))
                topRated.forEach(x => setMovieInfo(x.movieId, x.movieInfo))
            })
        }
        storeData()
    }, [])

    return (
        <div>
            <HomeHero />

            <div className="flex justify-center pt-6">
                <div className="flex flex-col w-5/6 2xl:w-3/5 gap-10 px-11 lg:px-0">
                    <Trending />
                    <NowPlaying />
                    <TopRated />
                </div>
            </div>
        </div>
    )
}
