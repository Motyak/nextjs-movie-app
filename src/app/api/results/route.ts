import { getBearerToken } from "@/conf/token";
import MovieInfo from "@/app/MovieInfo";
import getDetails from "@/app/api/getDetails";

export async function GET(_req: Request) { 
    let query = new URL(_req.url).searchParams.get("q")
    let url = "https://api.themoviedb.org/3/search/movie"
        + `?query=${encodeURIComponent(query ?? "")}`
        + "&language=fr"
        + "&region=FR"
    
    let req = fetch(url, {
        headers: {
            "Authorization": `Bearer ${getBearerToken()}`,
        },
    })
        
    let movieResults = await req.then(res => res.json()).then(obj => {
        let movieIds: number[] = obj.results.slice(0, 10).map((x: {id: number}) => x.id)
        return Promise.all(movieIds.map(getDetails)).then(movieInfos => {
            let moviesInfo: {movieId: number, movieInfo: MovieInfo}[] = []
            movieIds.forEach((id, index) => moviesInfo.push({movieId: id, movieInfo: movieInfos[index]}))
            return moviesInfo
        })
    })
    
    let response = {
        nbOfResults: Object.keys(movieResults).length,
        results: movieResults
    }
    return new Response(JSON.stringify(response))
}
