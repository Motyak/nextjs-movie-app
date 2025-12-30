import DetailsInfo from "./DetailsInfo"
import DetailsVideo from "./DetailsVideos"
import DetailsCasting from "./DetailsCasting"
import DetailsHero from "./DetailsHero"

export default async function Details({params}: {params: Promise<{movie_id: number}>}) {
    let movie_id = (await params).movie_id

    return (
        <>
            {/* blurred hero background */}
            <DetailsHero movie_id={movie_id} />

            <div className="flex justify-center pt-6">
                <div className="flex flex-col w-full 2xl:w-2/3 px-4 gap-20">
                    <DetailsInfo movie_id={movie_id} />
                    <DetailsVideo movie_id={movie_id} />
                    <DetailsCasting movie_id={movie_id} />
                </div>
            </div>
        </>
    )
}
