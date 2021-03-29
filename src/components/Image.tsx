import React from "react"
import { graphql } from "gatsby"
import Img, { FluidObject, GatsbyImageOptionalProps } from "gatsby-image"

import { ImageFragment } from "graphql-types"

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.com/docs/use-static-query/
 *
 * ^ I removed the static query but this comment helps explain what those are
 */

type Props = GatsbyImageOptionalProps & {
    image: ImageFragment | null | undefined
}

const Image = ({ image, ...rest }: Props) => {
    if (!image?.childImageSharp?.fluid) {
        return <div>Picture not found</div>
    }

    return <Img {...rest} fluid={image.childImageSharp.fluid as FluidObject} />
}

export default Image

export const imageFragment = graphql`
    fragment Image on File {
        childImageSharp {
            fluid(quality: 100, pngQuality: 100, maxHeight: 1000) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
        }
    }
`
