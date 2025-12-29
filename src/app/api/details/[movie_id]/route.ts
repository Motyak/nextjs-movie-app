import { getBearerToken } from "@/conf/token";
import MovieInfo from "@/app/MovieInfo";

export async function GET(req: Request, {params}: {params: Promise<{movie_id: string}>}) {
    let {movie_id} = await params
    
    let url = `https://api.themoviedb.org/3/movie/${movie_id}`
        + "?language=fr"
        + "&append_to_response=videos,credits"
    
    let res = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${getBearerToken()}`,
        },
    });
    
    let detailsObj = await res.json()

    let movieInfo: MovieInfo = {
        title: detailsObj.title,
        releaseYear: Number(detailsObj.release_date.slice(0, 4)),
        runtime: detailsObj.runtime,
        rating: detailsObj.vote_average / 10,
        genres: detailsObj.genres.map((x: any) => x.name),
        synopsis: detailsObj.overview,

        poster: detailsObj.poster_path.slice(1),
        videos: detailsObj.videos.results.map((x: any) => x.key),

        crew: detailsObj.credits.crew.slice(0, 4).map((x: any) => ({name: x.name, job: x.job})),
        casting: detailsObj.credits.cast.slice(0, 20).map((x: any) => ({name: x.name, character: x.character, photo: x.profile_path.slice(1)}))
    }

    return new Response(JSON.stringify(movieInfo))
}
