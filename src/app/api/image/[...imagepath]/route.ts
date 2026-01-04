import { getBearerToken } from "@/conf/token"

export async function GET(req: Request, {params}: {params: Promise<{imagepath: string[]}>}) {
    let {imagepath} = await params
    let [size, name] = imagepath

    let tmdbUrl = `https://image.tmdb.org/t/p/${size}/${name}`
    
    let response = await fetch(tmdbUrl, {
        headers: {
            "Authorization": `Bearer ${getBearerToken()}`,
        },
    })
    let imageBuffer = await response.arrayBuffer()
    return new Response(imageBuffer)
}
