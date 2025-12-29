
import { create } from "zustand"
import MovieInfo from "./app/MovieInfo"

type StoreState = {
    searchValue: string
    setSearchValue: (newValue: string) => void

    trending?: number[] | undefined
    setTrending: (newValue: number[]) => void

    nowPlaying?: number[] | undefined
    setNowPlaying: (newValue: number[]) => void

    topRated?: number[] | undefined
    setTopRated: (newValue: number[]) => void

    moviesInfo: {[id: number]: MovieInfo}
    getMovieInfo: (id: number) => MovieInfo | undefined
    setMovieInfo: (id: number, movieInfo: MovieInfo) => void

    // anotherValue: string
    // setAnotherValue: (newValue: string) => void
}

const useStore = create<StoreState>((set, get) => ({
    searchValue: "",
    setSearchValue: (newValue: string) => set({searchValue: newValue}),

    trending: undefined,
    setTrending: (newValue: number[]) => set({trending: newValue}),

    nowPlaying: undefined,
    setNowPlaying: (newValue: number[]) => set({nowPlaying: newValue}),

    topRated: undefined,
    setTopRated: (newValue: number[]) => set({topRated: newValue}),

    moviesInfo: {
        // tmp
        123: {
            title: "Sonic 2, le film",
            releaseYear: 2022,
            runtime: 142,
            rating: 0.8,
            genres: ["Action", "Science-Fiction", "Comédie", "Familial"],
            synopsis: "Bien installé dans la petite ville de Green Hills, Sonic veut maintenant prouver qu’il a l’étoffe d' un véritable héros. Un défi de taille se présente à lui quand le Dr Robotnik refait son apparition. Accompagné de son nouveau complice Knuckles, ils sont en quête d’une émeraude dont le pouvoir permettrait de détruire l’humanité toute entière. Pour s’assurer que l’émeraude ne tombe entre de mauvaises mains, Sonic fait équipe avec Tails. Commence alors un voyage à travers le monde, plein de péripéties.",

            poster: "/sonic_big.png",
            videos: [],

            crew: [
                {name: "Josh Miller", job: "Screenplay, Story"},
                {name: "Jeff Fowler", job: "Director"},
                {name: "Patrick Casey", job: "Screenplay, Story"},
                {name: "John Whittington", job: "Screenplay"},
            ],
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
