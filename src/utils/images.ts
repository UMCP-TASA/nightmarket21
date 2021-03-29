import { graphql } from "gatsby"
import { ImageWithPathFragment, MarkdownImgPathFragment } from "graphql-types"

export const pathFragments = graphql`
    fragment ImageWithPath on File {
        relativePath
    }
    fragment MarkdownImgPath on MarkdownRemark {
        frontmatter {
            imgsrc
        }
    }
`

export type DataWithImage<T extends MarkdownImgPathFragment, K extends ImageWithPathFragment> = {
    data: T | null | undefined,
    image: K | undefined
}

export function connectWithImage<T extends MarkdownImgPathFragment, K extends ImageWithPathFragment>(
    nodes: (T | null | undefined)[],
    images: K[]
): DataWithImage<T, K>[] {
    return nodes.map((node) => ({
        data: node,
        image: images.find((image) => node?.frontmatter?.imgsrc?.includes(image.relativePath))
    }))
    
}
