import MovieInfo from "@/app/MovieInfo"
import { getBearerToken } from "@/conf/token"

const parseReleaseYear = (x: string | number | null): number | undefined => {
    if (x === null || x === "") {
        return undefined
    }
    let number = Number(String(x).slice(0, 4))
    return Number.isNaN(number) ? undefined : number
}

const getDetails = (movieId: number): Promise<MovieInfo> => {
    let url = `https://api.themoviedb.org/3/movie/${movieId}`
        + "?language=fr"
        + "&append_to_response=videos,credits"

    let req = fetch(url, {
        headers: {
            "Authorization": `Bearer ${getBearerToken()}`,
        },
    });

    return req.then(res => res.json()).then(detailsObj => {
        let movieInfo: MovieInfo = {
            title: detailsObj.title,
            releaseYear: parseReleaseYear(detailsObj.release_date),
            runtime: detailsObj.runtime === null ? undefined :
                detailsObj.runtime == 0 ? undefined :
                detailsObj.runtime,
            rating: detailsObj.vote_average === null ? undefined :
                detailsObj.vote_average == 0 ? undefined :
                detailsObj.vote_average / 10,
            genres: detailsObj.genres?.map((x: any) => x.name),
            synopsis: detailsObj.overview,

            backdrop: detailsObj.backdrop_path?.slice(1),
            poster: detailsObj.poster_path?.slice(1),
            videos: detailsObj.videos.results
                .filter((x: any) => x.site == "YouTube")
                .map((x: any) => x.key)
                .filter((x: any) => x !== null),

            crew: detailsObj.credits.crew?.slice(0, 4).map((x: any) => ({name: x.name, job: x.job})),
            casting: detailsObj.credits.cast?.slice(0, 20).map((x: any) => ({
                name: x.name,
                character: x.character,
                photo: x.profile_path?.slice(1)
            })),
        }
        return movieInfo
    })
}

export default getDetails
