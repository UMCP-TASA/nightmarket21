import React from "react"
//import AniLink, { AniLinkProps } from "gatsby-plugin-transition-link/AniLink"
import { Link, GatsbyLinkProps } from "gatsby"
import { Button, ButtonProps } from "@material-ui/core"

type Props = ButtonProps & {
    to: string
    linkProps?: Omit<GatsbyLinkProps<{}>, "ref" | "to">
}

const LinkButton = ({ to, linkProps, children, ...rest }: Props) => (
    <Link to={to} {...linkProps} style={{ textDecoration: "none" }}>
        <Button {...rest}>{children}</Button>
    </Link>
)

export default LinkButton
