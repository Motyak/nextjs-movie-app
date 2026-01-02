"use client"

import { Input } from "baseui/input"
import { Menu } from "baseui/menu"
import { Button, SHAPE, KIND, SIZE } from "baseui/button"
import { archivo400, archivo600 } from "@/fonts"
import useStore from "@/store"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Magnifier = () => {
    let {searchValue, setSearchBarFocused} = useStore()
    let href = searchValue == "" ? "/" : `/results?q=${encodeURIComponent(searchValue.trim())}`

    return (
        <div className="flex items-center pl-2">
            <Link href={href} onClick={()=>{setSearchBarFocused(false)}}>
                <Button shape={SHAPE.square} kind={KIND.tertiary} size={SIZE.mini} tabIndex={-1} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 12C7.5913 12 9.11742 11.3678 10.2426 10.2426C11.3679 9.1174 12 7.5913 12 6C12 4.4087 11.3679 2.88257 10.2426 1.75735C9.11742 0.632136 7.5913 0 6 0C4.4087 0 2.88257 0.632136 1.75735 1.75735C0.632136 2.88257 0 4.4087 0 6C0 7.5913 0.632136 9.1174 1.75735 10.2426C2.88257 11.3678 4.4087 12 6 12ZM6 1.99999C7.06086 1.99999 8.07828 2.42142 8.82842 3.17157C9.57857 3.92172 10 4.93912 10 5.99999C10 7.06085 9.57857 8.07828 8.82842 8.82843C8.07828 9.57858 7.06086 9.99999 6 9.99999C4.93913 9.99999 3.92172 9.57858 3.17157 8.82843C2.42142 8.07828 2 7.06085 2 5.99999C2 4.93912 2.42142 3.92172 3.17157 3.17157C3.92172 2.42142 4.93913 1.99999 6 1.99999Z" fill="black"/>
                        <path d="M11.7095 10.2996L10.2953 11.7139L14.2975 15.7161L15.7117 14.3019L11.7095 10.2996Z" fill="black"/>
                    </svg>
                </Button>
            </Link>
        </div>
    )
}

const Cross = () => {
    let {setSearchValue} = useStore()
    const onClick = () => setSearchValue("")
    return (
        <button className="cursor-pointer" onClick={onClick}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M11.79 4.79L9 7.59L6.21 4.79L4.79 6.21L7.59 9L4.79 11.79L6.21 13.21L9 10.41L11.79 13.21L13.21 11.79L10.41 9L13.21 6.21L11.79 4.79Z" fill="black"/>
                <path d="M9 0C6.61305 0 4.32386 0.948211 2.63603 2.63604C0.948205 4.32387 0 6.61305 0 9C0 11.3869 0.948205 13.6761 2.63603 15.364C4.32386 17.0518 6.61305 18 9 18C11.3869 18 13.6761 17.0518 15.364 15.364C17.0518 13.6761 18 11.3869 18 9C18 6.61305 17.0518 4.32387 15.364 2.63604C13.6761 0.948211 11.3869 0 9 0ZM9 16C7.14348 16 5.363 15.2625 4.05025 13.9497C2.73749 12.637 2 10.8565 2 9C2 7.14348 2.73749 5.36301 4.05025 4.05025C5.363 2.7375 7.14348 2 9 2C10.8565 2 12.637 2.7375 13.9497 4.05025C15.2625 5.36301 16 7.14348 16 9C16 10.8565 15.2625 12.637 13.9497 13.9497C12.637 15.2625 10.8565 16 9 16Z" fill="black"/>
            </svg>
        </button>
    )
}

export default function SearchBar() {
    let router = useRouter()
    let {
        searchValue, setSearchValue,
        searchBarFocused, setSearchBarFocused,
        searchSuggestions, setSearchSuggestions,
    } = useStore()
    let href = searchValue == "" ? "/" : `/results?q=${encodeURIComponent(searchValue.trim())}`

    const onKeyDown = (e: any) => {
        if (e.key === "Enter") {
            router.push(href)
            setSearchBarFocused(false)
        }
    }

    const onChange = (e: React.ChangeEvent<any>) => {
        setSearchValue(e.target.value)
        // otherwise menu never re-appears after pressing ENTER
        setSearchBarFocused(true)
    }

    const onBlur = (e: React.FocusEvent<any>) => {
        // prevents suggestion links from being broken..
        // ..when we previously had focus on search bar
        let searchMenu = document.getElementById("searchmenu")
        if (e.relatedTarget === searchMenu || searchMenu?.contains(e.relatedTarget)) {
            // when clicking between menu items
            if (e.relatedTarget?.tagName === "UL") {
                e.currentTarget.focus()
            }
            return
        }

        let searchBar = document.getElementById("searchbar")
        // keep navigation with TAB and SHIFT+TAB
        if (e.relatedTarget === searchBar || searchBar?.contains(e.relatedTarget)) {
            return
        }

        setSearchBarFocused(false)
    }

    useEffect(() => {
        if (!searchValue.trim()) {
            return
        }

        const storeData = async () => {
            await fetch(`/api/search?q=${encodeURIComponent(searchValue.trim())}`)
                .then(x => x.json())
                .then(searchSuggestions => setSearchSuggestions(searchSuggestions))
        }

        let debounce = setTimeout(() => {
            storeData()
        }, 100)

        return () => clearTimeout(debounce)
    }, [searchValue])

    return (
        <div id="searchbar" className="relative" >
            <Input
                value={searchValue}
                onChange={onChange}
                onKeyDown={onKeyDown}
                onFocus={e => setSearchBarFocused(true)}
                onBlur={onBlur}
                clearable
                clearOnEscape={false}
                placeholder="Rechercher un film, un réalisateur, un acteur"
                overrides={{
                    Before: {
                        component: Magnifier
                    },
                    ClearIcon: {
                        component: Cross
                    },
                    Input: {
                        style: {
                            fontFamily: `${archivo400.style.fontFamily}`,
                            fontSize: "14px",
                        }
                    },
                    InputContainer: {
                        style: {
                            // background: "rgba(255, 255, 255, 0)",
                        }
                    },
                    Root: {
                        style: {
                            // background: "rgba(255, 255, 255, 0.2)",
                            // border: "0px",
                        }
                    }
                }}
            />
            {searchValue.trim() === "" || !searchBarFocused ? <></> :
                <div id="searchmenu" className="w-full absolute z-10">
                    <Menu
                        items={[...searchSuggestions, {divider: true}, {label: "Afficher tous les résultats", end: true}]}
                        // onItemSelect={({item, event}) => {console.log(item, event)}}
                        overrides={{
                            ListItem: {
                                component: (props) => {
                                    let { item } = props
                                    return item.end? (
                                        <Link href={`/results/?q=${encodeURIComponent(searchValue)}`} onClick={()=>setSearchBarFocused(false)}>
                                            <li className={`py-2 text-center text-black ${archivo600.className}`} style={{fontSize: "14px"}}>
                                                {item.label}
                                            </li>
                                        </Link>
                                    ) : (
                                        <Link href={`/details/${item.movieId}`} onClick={()=>setSearchBarFocused(false)}>
                                            <li className={`px-13 py-2 text-black hover:bg-gray-200 ${archivo400.className}`} style={{fontSize: "14px"}}>
                                                {item.movie}
                                            </li>
                                        </Link>
                                    )
                                }
                            }
                        }}
                    />
                </div>
            }
        </div>
    )
}
