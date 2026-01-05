import { getBearerToken } from "@/conf/token"

const parseReleaseYear = (x: string | number | null): number | undefined => {
    if (x === null || x === "") {
        return undefined
    }
    let number = Number(String(x).slice(0, 4))
    return Number.isNaN(number) ? undefined : number
}

export async function GET(_req: Request) {
    let query = new URL(_req.url).searchParams.get("q") ?? ""
    let searchMovies: Promise<number[]>
    let searchMulti: Promise<any>

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
            let movieIds: number[] = obj.results.slice(0, 10)
                .map((x: any) => {
                    let releaseYear = parseReleaseYear(x.release_date)
                    let movie = releaseYear === undefined ? x.title : `${x.title} (${releaseYear})`
                    return {movie, movieId: x.id}
                })
            return movieIds
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
        let results = obj.results.filter((x: any) => x.media_type == "person" || x.media_type == "movie")
        if (results.length === 0 || results[0].media_type !== "person") {
            let response = await searchMovies
            return new Response(JSON.stringify(response))
        }
        
        /* /movie_credits request */
        let personId = results[0].id
        let url = `https://api.themoviedb.org/3/person/${personId}/movie_credits?language=fr`

        let req = fetch(url, {
            headers: {
                "Authorization": `Bearer ${getBearerToken()}`,
            },
        })

        let response = await req.then(res => res.json()).then(obj => {
            let type = obj.cast.length >= obj.crew.length ? "cast" : "crew"
            let movieIds: number[] = obj[type]
                // remove duplicates (a crew person can have different jobs on a same movie)
                .filter((item: any, index: any, self: any) => index === self.findIndex((t: any) => t.id === item.id))
                .slice(0, 10)
                .map((x: any) => {
                    let releaseYear = parseReleaseYear(x.release_date)
                    let movie = releaseYear === undefined ? x.title : `${x.title} (${releaseYear})`
                    return {movie, movieId: x.id}
                })
            return movieIds
        })

        return new Response(JSON.stringify(response))
    })
}
