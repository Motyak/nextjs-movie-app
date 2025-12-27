export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export const getSearchParam = async (searchParams: SearchParams, key: string): Promise<string | undefined> => {
    let val = (await searchParams)[key]
    if (val !== undefined) {
        if (Array.isArray(val)) {
            if (val.length > 0) {
                return val[0]
            }
            return undefined
        }
        else {
            return val
        }
    }
    return val
}
