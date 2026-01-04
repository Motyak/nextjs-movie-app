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
    let url = "https://api.themoviedb.org/3/search/movie"
        + `?query=${encodeURIComponent(query)}`
        + "&language=fr"
        + "&region=FR"

    let req = fetch(url, {
        headers: {
            "Authorization": `Bearer ${getBearerToken()}`,
        },
    })

    let response = await req.then(res => res.json()).then(obj => {
        let movieIds: number[] = obj.results.slice(0, 10)
            .map((x: any) => {
                let releaseYear = parseReleaseYear(x.release_date)
                let movie = releaseYear === undefined ? x.title : `${x.title} (${releaseYear})`
                return {movie, movieId: x.id}
            })
        return movieIds
    })

    return new Response(JSON.stringify(response))
}
