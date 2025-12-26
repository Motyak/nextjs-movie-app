import type { Metadata } from "next"
import "./globals.css"
import { archivoNarrow700 } from "@/fonts"

import RootStyletron from "./RootStyletron"
import SearchBar from "./SearchBar"

const Logo = () => {
    return (
        <span className={`${archivoNarrow700.className} text-4xl select-none`}>MOVIENIGHT</span>
    )
}

const TopBar = () => {
    return (
        <div className="flex justify-center py-4">
            <div className="flex items-center w-full 2xl:w-3/5 px-4       border-x border-green-500 border-dotted">
                <span className="w-3/6 flex-none"><Logo /></span>
                <span className="flex-1 justify-end"><SearchBar /></span>
            </div>
        </div>
    )
}

export const metadata: Metadata = {
    title: "Movienight",
    description: "Movienight is a database for movies.",
}

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="en">
        <body>
        <RootStyletron>
            <div className="flex flex-col">
                <TopBar />
                {children}
            </div>
        </RootStyletron>
        </body>
        </html>
    )
}
