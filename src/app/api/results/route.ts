import { getBearerToken } from "@/conf/token";

export async function GET(_req: Request) {
    let searchParams = new URL(_req.url).searchParams
    let query = searchParams.get("q") ?? ""
    let page = searchParams.get("page") ?? 1
    let url = "https://api.themoviedb.org/3/search/movie"
        + `?query=${encodeURIComponent(query)}`
        + "&language=fr"
        + "&region=FR"
        + `&page=${page}`
    
    let req = fetch(url, {
        headers: {
            "Authorization": `Bearer ${getBearerToken()}`,
        },
    })

    let response = await req.then(res => res.json()).then(obj => {
        let nbOfResults = obj.total_results
        let nbOfPages = obj.total_pages
        let movieIds = obj.results.map((x: {id: number}) => x.id)
        return {nbOfResults, nbOfPages, movieIds}
    })

    return new Response(JSON.stringify(response))
}
