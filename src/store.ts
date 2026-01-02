
import { create } from "zustand"
import MovieInfo from "./app/MovieInfo"

export type SearchSuggestion = {
    movie: string // title + year
    movieId: number
}

export type SearchResult = {
    nbOfResults: number
    results: {movieId: number, movieInfo: MovieInfo}[]
}

type StoreState = {
    searchBarFocused: boolean
    setSearchBarFocused: (newValue: boolean) => void

    searchValue: string
    setSearchValue: (newValue: string) => void

    searchSuggestions: SearchSuggestion[]
    setSearchSuggestions: (newValue: SearchSuggestion[]) => void

    trending?: number[] | undefined
    setTrending: (newValue: number[]) => void

    nowPlaying?: number[] | undefined
    setNowPlaying: (newValue: number[]) => void

    topRated?: number[] | undefined
    setTopRated: (newValue: number[]) => void

    moviesInfo: {[id: number]: MovieInfo}
    getMovieInfo: (id: number) => MovieInfo | undefined
    setMovieInfo: (id: number, movieInfo: MovieInfo) => void

    searchResults: {[searchQuery: string]: SearchResult}
    getSearchResult: (searchQuery: string) => SearchResult | undefined
    setSearchResult: (searchQuery: string, searchResult: SearchResult) => void

    // anotherValue: string
    // setAnotherValue: (newValue: string) => void
}

const useStore = create<StoreState>((set, get) => ({
    searchBarFocused: false,
    setSearchBarFocused: (newValue: boolean) => set({searchBarFocused: newValue}),

    searchValue: "",
    setSearchValue: (newValue: string) => set({searchValue: newValue}),

    searchSuggestions: [],
    setSearchSuggestions: (newValue: SearchSuggestion[]) => set({searchSuggestions: newValue}),

    trending: undefined,
    setTrending: (newValue: number[]) => set({trending: newValue}),

    nowPlaying: undefined,
    setNowPlaying: (newValue: number[]) => set({nowPlaying: newValue}),

    topRated: undefined,
    setTopRated: (newValue: number[]) => set({topRated: newValue}),

    moviesInfo: {},
    getMovieInfo: (id: number) => {
        const state = get()
        return state.moviesInfo[id]
    },
    setMovieInfo: (id: number, newValue: MovieInfo) => set((state) => ({
        moviesInfo: {...state.moviesInfo, [id]: newValue}
    })),

    searchResults: {
        "": {nbOfResults: 0, results: []} // cache empty search query
    },
    getSearchResult: (searchQuery: string) => {
        const state = get()
        return state.searchResults[searchQuery]
    },
    setSearchResult: (searchQuery: string, newValue: SearchResult) => set((state) => ({
        searchResults: {...state.searchResults, [searchQuery]: newValue}
    })),

    // anotherValue: "",
    // setAnotherValue: (newValue: string) => set({ anotherValue: newValue }),
}))

export default useStore
