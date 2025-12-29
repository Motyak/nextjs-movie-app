import { getBearerToken } from "@/conf/token";
import MovieInfo from "@/app/MovieInfo";

// YYYY/MM/DD
const formatDate = (date: Date): string => {
    let year = date.getFullYear()
    let month = String(date.getMonth() + 1).padStart(2, "0") // getMonth() is 0-indexed
    let day = String(date.getDate()).padStart(2, "0")
    return `${year}/${month}/${day}`
}

const getWeekExtremum = (): string[] => {
    let today = new Date()
    let dayOfTheWeek = (today.getDay() + 6) % 7 // Mo = 0, Su = 6
    let weekStart = new Date(today); weekStart.setDate(today.getDate() - dayOfTheWeek)
    let weekEnd = new Date(today); weekEnd.setDate(today.getDate() + (6 - dayOfTheWeek))
    return [weekStart, weekEnd].map(formatDate)
}

const getDetails = (movieId: number): Promise<MovieInfo> => {
    return fetch(`/api/details/${movieId}`).then(x => x.json())
}

export async function GET(req: Request) {
    let trending: Promise<MovieInfo[]>
    let nowPlaying: Promise<{[movieId: number]: MovieInfo}>
    let topRated: Promise<MovieInfo[]>

    /* now playing movies */
    {
        let [dateFrom, dateTo] = getWeekExtremum()
        let url = "https://api.themoviedb.org/3/discover/movie"
            + "?language=fr"
            + "&region=FR"
            + "&with_release_type=2|3"
            + "&sort_by=popularity.desc"
            + `&release_date.gte=${dateFrom}`
            + `&release_date.lte=${dateTo}`
        
        let req = fetch(url, {
            headers: {
                "Authorization": `Bearer ${getBearerToken()}`,
            },
        })
        
        nowPlaying = req.then(async res => {
            let movieIds: number[] = (await res.json())
                .results
                .slice(0, 10)
                .map((x: {id: number}) => x.id)
            return Promise.all(movieIds.map(getDetails)).then(movieInfos => {
                let table: {[movieId: number]: MovieInfo} = {}
                movieIds.forEach((id, index) => table[id] = movieInfos[index]);
                return table
            })
        })
    }
    
    let response = {
        // trending: await trending,
        nowPlaying: await nowPlaying,
        // topRated: await topRated,
    }
    return new Response(JSON.stringify(response))
}
