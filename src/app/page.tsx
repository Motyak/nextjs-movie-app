import { inter400 } from "@/fonts"
import FilmCard from "./FilmCard"
import HorizontalCarousel from "./HorizontalCarousel"


const TrendingHero = () => {
    return (
        <div className="border-y border-green-500 border-dotted">NowPlaying</div>
    )
}

const NowPlaying = () => {
    return (
        <div className="flex flex-col     border-y border-red-500 border-dotted">
            <h2 className={`${inter400.className} text-xl`}>À l'affiche cette semaine</h2>
            <div className="pt-4">
                <HorizontalCarousel>
                    <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                    <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                    <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                    <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                    <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                    <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                    <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" duration="1h48" />
                    
                    <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" rating={80} />
                    <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" rating={80} />
                    <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" rating={80} />
                    <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" rating={80} />
                    <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" rating={80} />
                    <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" rating={80} />
                    <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" rating={80} />
                    
                    <FilmCard src="/sonic_poster.png" name="Sonic 2, le film" rating={80} />
                </HorizontalCarousel>
            </div>
        </div>
    )
}

const TopRated = () => {
    return (
        <div className="border-y border-blue-500 border-dotted">TopRated</div>
    )
}

export default function Home() {
    return (
        <div className="flex justify-center">
            <div className="flex flex-col w-5/6 2xl:w-3/5">
                <TrendingHero />
                <NowPlaying />
                <TopRated />
            </div>
        </div>

        // <div className="flex flex-col">
        //     <TrendingHero />
        //     <NowPlaying />
        //     <TopRated />
        // </div>
    )
}
