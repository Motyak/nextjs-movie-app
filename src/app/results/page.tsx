type SearchParams = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Results({searchParams}: SearchParams) {
    let searchQuery = (await searchParams).q
    return (
        <div className="border border-red-500 border-dotted">{searchQuery}</div>
    )
}
