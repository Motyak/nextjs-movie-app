import DetailsInfo from "./DetailsInfo"
import DetailsVideo from "./DetailsVideos"
import DetailsCasting from "./DetailsCasting"

export default async function Details({params}: {params: Promise<{movie_id: number}>}) {
    let movie_id = (await params).movie_id

    return (
        <div className="flex justify-center pt-6">
            <div className="flex flex-col w-full 2xl:w-2/3 px-4              border border-red-500 border-dotted">
                <DetailsInfo movie_id={movie_id} />
                <DetailsVideo />
                <DetailsCasting />
            </div>
        </div>
    )
}
