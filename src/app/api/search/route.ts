import { getBearerToken } from "@/conf/token";

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

    let response = await req.then(res => res.json()).then(obj => {
        let movieIds: number[] = obj.results.slice(0, 10)
            .map((x: {title: string, id: number, release_date: string}) => ({
                movie: x.title + (x.release_date? ` (${String(x.release_date).slice(0, 4)})` : ""),
                movieId: x.id
            }))
        return movieIds
    })

    return new Response(JSON.stringify(response))
}
