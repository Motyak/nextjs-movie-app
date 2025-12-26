
import { create } from "zustand"

type StoreState = {
    searchValue: string
    setSearchValue: (newValue: string) => void

    // anotherValue: string
    // setAnotherValue: (newValue: string) => void
}

const useStore = create<StoreState>((set) => ({
    searchValue: "",
    setSearchValue: (newValue: string) => set({ searchValue: newValue }),

    // anotherValue: "",
    // setAnotherValue: (newValue: string) => set({ anotherValue: newValue }),
}))

export default useStore
