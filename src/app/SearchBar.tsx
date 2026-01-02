"use client"

import { Input } from "baseui/input"
import { Menu } from "baseui/menu"
import { Button, SHAPE, KIND, SIZE } from "baseui/button"
import { archivo400 } from "@/fonts"
import useStore from "@/store"
import Link from "next/link"
import { useRouter } from "next/navigation"

const Magnifier = () => {
    let {searchValue, setSearchBarFocused} = useStore()
    let href = searchValue == "" ? "/" : `/results?q=${encodeURIComponent(searchValue.trim())}`

    return (
        <div className="flex items-center pl-2">
            <Link href={href} onClick={()=>{setSearchBarFocused(false)}}>
                <Button shape={SHAPE.square} kind={KIND.tertiary} size={SIZE.mini}>
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                        <path stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" />
                    </svg>
                </Button>
            </Link>
        </div>
    )
}

export default function SearchBar() {
    let router = useRouter()
    let {searchValue, setSearchValue, searchBarFocused, setSearchBarFocused} = useStore()
    let href = searchValue == "" ? "/" : `/results?q=${encodeURIComponent(searchValue.trim())}`

    const onKeyDown = (e: any) => {
        if (e.key === "Enter") {
            router.push(href)
        }
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

    let items = [
        {label: "hello", movieId: "123"},
        {label: "hello2", movieId: "777"},
    ]

    return (
        <div id="searchbar" className={"relative"}>
            <Input
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                onKeyDown={onKeyDown}
                onFocus={e => setSearchBarFocused(true)}
                onBlur={onBlur}
                clearable
                clearOnEscape={false}
                placeholder="Rechercher un film, un réalisateur, un acteur"
                overrides={{
                    Before: {
                        component: Magnifier
                    }
                }}
            />
            {searchValue.trim() === "" || !searchBarFocused ? <></> :
                <div id="searchmenu" className="w-full absolute z-10">
                    <Menu
                        items={items}
                        // onItemSelect={({item, event}) => {console.log(item, event)}}
                        overrides={{
                            ListItem: {
                                component: (props) => {
                                    let { item } = props
                                    return (
                                        <Link href={`/details/${item.movieId}`} onClick={()=>setSearchBarFocused(false)}>
                                            <li className={"px-13 py-2 text-black hover:bg-gray-200"}>
                                                {item.label}
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
