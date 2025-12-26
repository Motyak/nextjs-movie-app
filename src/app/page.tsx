import FilmCard from "./FilmCard"
import HorizontalCarousel from "./HorizontalCarousel"


const TrendingHero = () => {
    return (
        <div className="border-y border-red-500 border-dotted">
            <HorizontalCarousel>
                <FilmCard />
                <FilmCard />
                <FilmCard />
                <FilmCard />
                <FilmCard />
                <FilmCard />
                <FilmCard />
                
                <FilmCard />
                <FilmCard />
                <FilmCard />
                <FilmCard />
                <FilmCard />
                <FilmCard />
                <FilmCard />
                
                <FilmCard />
            </HorizontalCarousel>
        </div>
    )
}

const NowPlaying = () => {
    return (
        <div className="border-y border-green-500 border-dotted">NowPlaying</div>
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
