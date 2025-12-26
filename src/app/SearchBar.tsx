"use client"

import { Input } from "baseui/input"
import { Button, SHAPE, KIND, SIZE } from "baseui/button";
import { archivo400 } from "@/fonts";
import useStore from "@/store"

const Magnifier = () => {
    const {searchValue} = useStore()
    const onClick = () => console.log(searchValue)

    return (
        <div className="flex items-center pl-2">
            <Button shape={SHAPE.square} kind={KIND.tertiary} size={SIZE.mini} onClick={onClick}>
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                    <path stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" />
                </svg>
            </Button>
        </div>
    )
}

export default function SearchBar() {
    const {searchValue, setSearchValue} = useStore()

    return (
        <div className={`${archivo400.className}`}>
            <Input
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                clearable
                placeholder="Rechercher un film, un réalisateur, un acteur"
                overrides={{
                    Before: {
                        component: Magnifier
                    }
                }}
            />
        </div>
    );
}
