"use client"

import engine from "~/lib/styletron"
import { Provider as StyletronProvider } from "styletron-react"
import { LightTheme, BaseProvider } from "baseui"

export default function RootStyletron({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <StyletronProvider value={engine}>
            <BaseProvider theme={LightTheme}>
                {children}
            </BaseProvider>
        </StyletronProvider>
    )
}
