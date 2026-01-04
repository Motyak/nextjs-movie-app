import type { Metadata } from "next"
import "./globals.css"

import RootStyletron from "~/lib/RootStyletron"
import Logo from "./Logo"
import SearchBar from "./SearchBar"

const TopBar = () => {
    return (
        <div className="flex justify-center pb-4">
            <div className="flex items-center w-full 2xl:w-3/5 px-4 2xl:px-0">
                <span className="w-1/2 flex-none"><Logo /></span>
                <span className="flex-1"><SearchBar /></span>
            </div>
        </div>
    )
}

export const metadata: Metadata = {
    title: "Movienight",
    description: "Movienight est une base de données de films.",
}

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="fr">
        <body>
        <RootStyletron>
            <div className="flex flex-col py-4">
                <TopBar />
                {children}
            </div>
        </RootStyletron>
        </body>
        </html>
    )
}
