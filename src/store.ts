
import { create } from "zustand"
import MovieInfo from "./app/MovieInfo"

type StoreState = {
    searchValue: string
    setSearchValue: (newValue: string) => void

    moviesInfo: {[id: number]: MovieInfo}
    getMovieInfo: (id: number) => MovieInfo | undefined
    setMovieInfo: (id: number, movieInfo: MovieInfo) => void

    // anotherValue: string
    // setAnotherValue: (newValue: string) => void
}

const useStore = create<StoreState>((set, get) => ({
    searchValue: "",
    setSearchValue: (newValue: string) => set({searchValue: newValue}),

    moviesInfo: {
        // tmp
        123: {
            title: "Sonic 2, le film",
            releaseYear: 2022,
            runtime: 142,
            rating: 0.8,
            genres: ["Action", "Science-Fiction", "Comédie", "Familial"],
            synopsis: "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",

            poster: "/sonic_big.png",
            videos: [],

            casting: [],
        }
    },
    getMovieInfo: (id: number) => {
        const state = get()
        return state.moviesInfo[id]
    },
    setMovieInfo: (id: number, newValue: MovieInfo) => set((state) => ({
        moviesInfo: {...state.moviesInfo, [id]: newValue}
    })),

    // anotherValue: "",
    // setAnotherValue: (newValue: string) => set({ anotherValue: newValue }),
}))

export default useStore
