import { getBearerToken } from "@/conf/token"
import MovieInfo from "@/app/MovieInfo";
import getDetails from "@/app/api/getDetails";

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

export async function GET(req: Request) {
    let trending: Promise<{movieId: number, movieInfo: MovieInfo}[]>
    let nowPlaying: Promise<{movieId: number, movieInfo: MovieInfo}[]>
    let topRated: Promise<{movieId: number, movieInfo: MovieInfo}[]>

    /* trending movies */
    {
        let url = "https://api.themoviedb.org/3/trending/movie/day?language=fr"

        let req = fetch(url, {
            headers: {
                "Authorization": `Bearer ${getBearerToken()}`,
            },
        })

        trending = req.then(res => res.json()).then(obj => {
            let movieIds: number[] = obj.results.slice(0, 3).map((x: {id: number}) => x.id)
            return Promise.all(movieIds.map(getDetails)).then(movieInfos => {
                let moviesInfo: {movieId: number, movieInfo: MovieInfo}[] = []
                movieIds.forEach((id, index) => moviesInfo.push({movieId: id, movieInfo: movieInfos[index]}))
                return moviesInfo
            })
        })
    }

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
        
        nowPlaying = req.then(res => res.json()).then(obj => {
            let movieIds: number[] = obj.results.slice(0, 10).map((x: {id: number}) => x.id)
            return Promise.all(movieIds.map(getDetails)).then(movieInfos => {
                let moviesInfo: {movieId: number, movieInfo: MovieInfo}[] = []
                movieIds.forEach((id, index) => moviesInfo.push({movieId: id, movieInfo: movieInfos[index]}))
                return moviesInfo
            })
        })
    }

    /* top rated movies */
    {
        let url = "https://api.themoviedb.org/3/discover/movie"
            + "?language=fr"
            + "&region=FR"
            + "&sort_by=vote_average.desc"
            + "&vote_count.gte=5000"

        let req = fetch(url, {
            headers: {
                "Authorization": `Bearer ${getBearerToken()}`,
            },
        })

        topRated = req.then(res => res.json()).then(obj => {
            let movieIds: number[] = obj.results.slice(0, 10).map((x: {id: number}) => x.id)
            return Promise.all(movieIds.map(getDetails)).then(movieInfos => {
                let moviesInfo: {movieId: number, movieInfo: MovieInfo}[] = []
                movieIds.forEach((id, index) => moviesInfo.push({movieId: id, movieInfo: movieInfos[index]}))
                return moviesInfo
            })
        })
    }
    
    let response = {
        trending: await trending,
        nowPlaying: await nowPlaying,
        topRated: await topRated,
    }
    return new Response(JSON.stringify(response))
}
