import React, { useState } from "react"
import { PageProps, graphql } from "gatsby"
import {
    Button,
    Grid,
    Hidden,
    IconButton,
    makeStyles,
    Typography,
} from "@material-ui/core"
import { ArrowBackIosRounded, ArrowForwardIosRounded } from "@material-ui/icons"

import SwipeableViews from "react-swipeable-views"

import FoodBackground from "assets/backgrounds/foodBackground.svg"

import { FoodPageQuery, FoodFragment } from "graphql-types"
import { Food } from "components/Food"
import SEO from "components/seo"
import { connectWithImage } from "utils/images"

const useStyles = makeStyles(theme => ({
    background: {
        height: "100%",
        width: "100%",
        position: "absolute",
        top: "0",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        textAlign: "center",
    },
    center: {
        // display: "grid",
        // placeItems: "center",
        // margin: "auto",
        padding: theme.spacing(2),

        [theme.breakpoints.up("md")]: {
            height: "90vh",
        },

        [theme.breakpoints.between("md", "lg")]: {
            paddingTop: theme.spacing(4),
        },

        [theme.breakpoints.up("xl")]: {
            display: "grid",
            placeItems: "center"
        }
    },
    view: {
        // display: "grid",
        // placeItems: "center",
    },
}))

const FoodPage = ({ data }: PageProps<FoodPageQuery>) => {
    const classes = useStyles()
    const [index, setIndex] = React.useState(0)
    const handleNext = () => {
        setIndex(prevIndex => prevIndex + 1)
    }

    const handleBack = () => {
        setIndex(prevIndex => prevIndex - 1)
    }

    const handleChange = (newIndex: number) => {
        setIndex(newIndex)
    }

    const food_lst = connectWithImage(data.food.nodes, data.images.nodes)

    return (
        <>
            <SEO title="Food" />
            <FoodBackground className={classes.background} />
            <div className={classes.center}>
                <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={1}
                >
                    <Hidden smDown>
                        <Grid item>
                            <IconButton
                                onClick={handleBack}
                                disabled={index == 0}
                            >
                                <ArrowBackIosRounded />
                            </IconButton>
                        </Grid>
                    </Hidden>

                    <Grid item xs={12} md={10}>
                        <SwipeableViews
                            className={classes.view}
                            enableMouseEvents
                            index={index}
                            onChangeIndex={handleChange}
                        >
                            {food_lst.map(({ data, image }) => (
                                <Food food={data} image={image} key={data?.id} />
                            ))}
                        </SwipeableViews>
                    </Grid>

                    <Hidden smDown>
                        <Grid item>
                            <IconButton
                                onClick={handleNext}
                                disabled={index == food_lst.length - 1}
                            >
                                <ArrowForwardIosRounded />
                            </IconButton>
                        </Grid>
                    </Hidden>

                    <Hidden mdUp>
                        <Grid item xs={6}>
                            <Button
                                onClick={handleBack}
                                variant="contained"
                                fullWidth
                                disabled={index == 0}
                                color="primary"
                            >
                                Back
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                onClick={handleNext}
                                variant="contained"
                                fullWidth
                                disabled={index == food_lst.length - 1}
                                color="primary"
                            >
                                Next
                            </Button>
                        </Grid>
                    </Hidden>
                </Grid>
            </div>
        </>
    )
}

export default FoodPage

export const query = graphql`
    fragment Food on MarkdownRemark {
        ...MarkdownImgPath
        id
        frontmatter {
            name
            imgsrc
            video
        }
        html
    }

    fragment FoodImage on File {
        childImageSharp {
            fluid(quality: 100, pngQuality: 100, maxHeight: 1000) {
                ...GatsbyImageSharpFluid_withWebp
            }
        }
    }

    query FoodPage {
        food: allMarkdownRemark(
            filter: { frontmatter: { category: { eq: "food" } } }
        ) {
            nodes {
                ...Food
            }
        }
        images: allFile(
            filter: { absolutePath: { regex: "/static/assets/" } }
        ) {
            nodes {
                ...Image
                ...ImageWithPath
            }
        }
    }
`
