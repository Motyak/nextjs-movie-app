import NowPlaying from "@/app/NowPlaying"
import { inter400 } from "@/fonts"
import HorizontalCarousel from "./HorizontalCarousel"
import MovieCard from "@/app/MovieCard"

const TrendingHero = () => {
    return (
        <div className="border-y border-green-500 border-dotted">TrendingHero</div>
    )
}

const TopRated = () => {
    return (
        <div className="flex flex-col     border-y border-blue-500 border-dotted">
            <h2 className={`${inter400.className} text-xl`}>Les films les mieux notés</h2>
            <div className="pt-4">
                <HorizontalCarousel>
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" rating={80} />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" rating={80} />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" rating={80} />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" rating={80} />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" rating={80} />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" rating={80} />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" rating={80} />
                    
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" rating={80} />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" rating={80} />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" rating={80} />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" rating={80} />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" rating={80} />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" rating={80} />
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" rating={80} />
                    
                    <MovieCard src="/sonic_poster.png" name="Sonic 2, le film" rating={80} />
                </HorizontalCarousel>
            </div>
        </div>
    )
}

export default function Home() {
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
