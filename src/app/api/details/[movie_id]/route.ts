import getDetails from "@/app/api/getDetails";

export async function GET(req: Request, {params}: {params: Promise<{movie_id: string}>}) {
    let {movie_id} = await params
    
    let movieInfo = await getDetails(Number(movie_id))

    return new Response(JSON.stringify(movieInfo))
}
