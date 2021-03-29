declare module "gatsby-plugin-transition-link/AniLink" {
    import React from "react"
    import { GatsbyLinkProps } from "gatsby"
    export interface AniLinkProps extends GatsbyLinkProps<{}> {
        duration?: number

        fade?: boolean
        paintDrip?: boolean
        swipe?: boolean
        cover?: boolean

        direction?: "up" | "down" | "left" | "right"
        top?: "exit" | "entry"

        entryOffset?: number
        color?: string
        hex?: string

        bg?: React.CSSProperties["background"]
    }

    const AniLink: React.FC<AniLinkProps>

    export default AniLink
}
