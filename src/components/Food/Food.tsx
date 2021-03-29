import React from "react"
import { FoodFragment, ImageFragment } from "graphql-types"
import { Grid, makeStyles, Card, Hidden, Typography } from "@material-ui/core"

import { getEmbedUrl } from "@utils"
import Image from "components/Image"

const useStyles = makeStyles(theme => ({
    root: {
        overflowY: "scroll",
        [theme.breakpoints.up("md")]: {
            height: "70vh",
        },
    },
    title: {
        fontWeight: "bold",
    },
    content: {
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(2),
        }
    },
    image: {
        // width: "100%",
        height: "100%",
        // objectFit: "cover",
        // borderRadius: "20px",
        // padding: "10px",

        [theme.breakpoints.down("sm")]: {
            borderRadius: theme.shape.borderRadius,
        }
    },
    video: {
        borderRadius: "7px",
        width: "100%",
        // aspectRatio: "16 / 9"
        height: "35vh",
    },
    body: {
        padding: theme.spacing(2),
    },
    html: {
        // [theme.breakpoints.up("md")]: {
        //     height: "20vh",
        //     overflowY: "scroll"
        // }
    },
}))

type Props = {
    food: FoodFragment | null | undefined
    image: ImageFragment | null | undefined
}

export default function Food({ food, image }: Props) {
    const classes = useStyles()

    if (!food) {
        throw new Error("Food does not exist")
    }

    if (!food.frontmatter) {
        throw new Error("Frontmatter does not exist")
    }

    if (!image) {
        throw new Error("Image does not exist")
    }

    let video = null
    if (food.frontmatter.video) {
        video = <iframe
            className={classes.video}
            src={getEmbedUrl(food.frontmatter.video)}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            frameBorder="0"
            allowFullScreen
        />
    }

    return (
        <Card className={classes.root}>
            <Grid
                container
                className={classes.content}
                justify="center"
                alignItems="stretch"
            // style={{overflowY: 'scroll'}}
            >
                <Hidden mdUp>
                    <Grid item xs={12}>
                        <Typography
                            className={classes.title}
                            gutterBottom
                            variant="h3"
                            component="h2"
                            align="center"
                            color="textPrimary"
                        >
                            {food.frontmatter.name}
                        </Typography>
                    </Grid>
                </Hidden>
                <Grid item xs={12} md={6}>
                    <Image className={classes.image} image={image} imgStyle={{
                        height: "100%"
                    }} />
                </Grid>
                <Grid item className={classes.body} xs={12} md={6} container direction="column">
                    <Hidden smDown>
                        <Grid item>
                            <Typography
                                className={classes.title}
                                gutterBottom
                                variant="h3"
                                component="h2"
                                align="center"
                                color="textPrimary"
                            >
                                {food.frontmatter.name}
                            </Typography>

                        </Grid>
                    </Hidden>
                    {video && <Grid item>
                        {video}
                    </Grid>}

                    {food.html && (
                        <Grid item>
                            <div
                                className={classes.html}
                                dangerouslySetInnerHTML={{ __html: food.html }}
                            />
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Card>
    )
}
