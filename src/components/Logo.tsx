import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { makeStyles } from "@material-ui/core"
import Img, { FixedObject } from "gatsby-image"
import { LogoQuery } from "graphql-types"

const useStyles = makeStyles({
    root: {
        verticalAlign: "middle",
    },
})

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

export default function Logo() {
    const classes = useStyles()
    const data: LogoQuery = useStaticQuery(graphql`
        query Logo {
            file(relativePath: { eq: "totlogo.png" }) {
                childImageSharp {
                    fixed(width: 40, height: 40) {
                        ...GatsbyImageSharpFixed_withWebp
                    }
                }
            }
        }
    `)

    const image = data.file?.childImageSharp?.fixed
    if (!image) throw new Error("Image doesn't exist.")

    return (
        <Img
            className={classes.root}
            alt="Tour of taiwan logo"
            fixed={image as FixedObject}
        />
    )
}
