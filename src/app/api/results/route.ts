import { getBearerToken } from "@/conf/token"

/*
    we make our own paging here because /movie_credits
    doesn't support ?page query param
*/
const movieCreditsRequest = async (personId: number, page: number) => {
    let url = `https://api.themoviedb.org/3/person/${personId}/movie_credits?language=fr`

    let req = fetch(url, {
        headers: {
            "Authorization": `Bearer ${getBearerToken()}`,
        },
    })

    let response = await req.then(res => res.json()).then(obj => {
        let type = obj.cast.length >= obj.crew.length ? "cast" : "crew"
        let nbOfResults = obj[type].length
        let nbOfPages = Math.ceil(obj[type].length / 20)
        let movieIds = obj[type]
            // remove duplicates (a crew person can have different jobs on a same movie)
            .filter((item: any, index: any, self: any) => index === self.findIndex((t: any) => t.id === item.id))
            .slice((page - 1) * 20, page * 20)
            .map((x: {id: number}) => x.id)
        return {personId, nbOfResults, nbOfPages, movieIds}
    })

    return response
}

export async function GET(_req: Request) {
    let searchParams = new URL(_req.url).searchParams
    let query = searchParams.get("q") ?? ""
    let page = Number(searchParams.get("page")) ?? 1
    let personId = searchParams.get("person_id") ?? undefined

    if (personId !== undefined) {
        let response = await movieCreditsRequest(Number(personId), Number(page))
        return new Response(JSON.stringify(response))
    }

    let searchMovies: Promise<any> | undefined
    let searchMulti: Promise<any> | undefined

    /* /movie query */
    {
        let url = "https://api.themoviedb.org/3/search/movie"
            + `?query=${encodeURIComponent(query)}`
            + "&language=fr"
            + "&region=FR"

        let req = fetch(url, {
            headers: {
                "Authorization": `Bearer ${getBearerToken()}`,
            },
        })

        searchMovies = req.then(res => res.json()).then(obj => {
            let nbOfResults = obj.total_results
            let nbOfPages = obj.total_pages
            let movieIds = obj.results.map((x: {id: number}) => x.id)
            return {nbOfResults, nbOfPages, movieIds}
        })
    }

    /* /multi query */
    {
        let url = "https://api.themoviedb.org/3/search/multi"
            + `?query=${encodeURIComponent(query)}`
            + "&language=fr"

        let req = fetch(url, {
            headers: {
                "Authorization": `Bearer ${getBearerToken()}`,
            },
        })

        searchMulti = req.then(res => res.json())
    }

    return await searchMulti.then(async obj => {
        let results = obj.results.filter((x: any) => (x.media_type == "person" && x.popularity >= 0.1) || x.media_type == "movie")
        if (results.length === 0 || results[0].media_type !== "person") {
            let response = await searchMovies
            return new Response(JSON.stringify(response))
        }

        let personId = results[0].id
        let response = await movieCreditsRequest(personId, page)
        return new Response(JSON.stringify(response))
    })
}
