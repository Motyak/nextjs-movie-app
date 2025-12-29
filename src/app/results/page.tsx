import { SearchParams, getSearchParam } from "@/utils/searchparams"
import FetchResults from "@/app/results/FetchResults"

export default async function Results({searchParams}: {searchParams: SearchParams}) {
    let searchQuery = await getSearchParam(searchParams, "q") ?? ""
    return <FetchResults searchQuery={searchQuery} />
}
