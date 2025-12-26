import type { Metadata } from "next"
import "./globals.css"
import { archivoNarrow700 } from "@/fonts"

import RootStyletron from "./RootStyletron"
import SearchBar from "./SearchBar"

const Logo = () => <span className={`${archivoNarrow700.className}`}>MOVIENIGHT</span>

const TopBar = () => {
    return (
        <div className="flex">
            <div className="flex-none"><Logo /></div>
            <div className="flex-initial"><SearchBar /></div>
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
            <body className="flex flex-col">
                <RootStyletron>
                    <TopBar />
                    {children}
                </RootStyletron>
            </body>
        </html>
    )
}
