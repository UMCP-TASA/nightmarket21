import React from "react"
import { PageProps, graphql } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import { CitiesPageQuery, CityFragment } from "graphql-types"
import { IconButton, Drawer, List, ListItem, Button } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"

import SEO from "components/seo"
import { City } from "components/City"
import Image from "components/Image"
import useBoop from "hooks/useBoop"
import { animated, useSpring } from "react-spring"

const drawerWidth = "40%"
const fullDrawerWidth = "100%"
const maxCities = 6

const getSvgPath = (file: string) => `/svg/cities/${file}`

const useStyles = makeStyles(theme => ({
    container: {
        height: "100%",
        width: "100%",
        position: "absolute",
        top: "0",
        backgroundImage: "url(/svg/cities/sea.svg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    },
    map: {
        height: "100%",
        width: "100%",
    },
    drawerPaper: {
        width: drawerWidth,
        zIndex: theme.zIndex.appBar - 1,
        background: "transparent",
        borderLeft: "none",

        [theme.breakpoints.down("sm")]: {
            width: fullDrawerWidth,
        },
    },
    hide: { display: "none" },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: "flex-start",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,

        [theme.breakpoints.down("sm")]: {
            width: fullDrawerWidth,
        },
    },
    content: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: "-40%", //drawerWidth
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    },
    styleCity: {},
    styleCityClicked: {
        background: "rgb(236, 252, 240)",
        boxShadow: "rgba(0, 0, 0, .2) 0px 0px 5px 2px",
    },
    toolbar: {
        ...theme.mixins.toolbar,
    },
    taiwanMap: {
        width: "20%",
        height: "75%",
        margin: "0 auto",
        marginTop: "15vh",
    },
}))

const CitiesPage = ({ data }: PageProps<CitiesPageQuery>) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(true)
    const [cityIndex, setCityIndex] = React.useState(1)
    const [city, setCity] = React.useState(data.taipei)

    const handleDrawerOpen = (
        data: CityFragment | null | undefined,
        num: number
    ) => {
        setOpen(true)
        num >= maxCities ? setCityIndex(0) : setCityIndex(num)
        setCity(data)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    const markers = [
        {
            name: "Taipei",
            marginSide: "50%",
            marginTop: "1%",
            data: data.taipei,
            index: 1,
            icon: getSvgPath("taipeiIcon.svg"),
        },
        {
            name: "Taichung",
            marginSide: "20%",
            marginTop: "26%",
            data: data.taichung,
            index: 2,
            icon: getSvgPath("taichungIcon.svg"),
        },
        {
            name: "Tainan",
            marginSide: "6%",
            marginTop: "55%",
            data: data.tainan,
            index: 3,
            icon: getSvgPath("tainanIcon.svg"),
        },
        {
            name: "Kaohsiung",
            marginSide: "22%",
            marginTop: "65%",
            data: data.kaohsiung,
            index: 4,
            icon: getSvgPath("kaoshiungIcon.svg"),
        },
        {
            name: "Hualien",
            marginSide: "59%",
            marginTop: "35%",
            data: data.hualien,
            index: 5,
            icon: getSvgPath("hualienIcon.svg"),
        },
        {
            name: "Shifen",
            marginSide: "68%",
            marginTop: "-3%",
            data: data.shifen,
            index: 6,
            icon: getSvgPath("shifenIcon.svg"),
        },
    ]
    let i
    let cityBoops: ReturnType<typeof useBoop>[] = []
    for (i = 0; i < maxCities; i++) {
        cityBoops.push(useBoop({ scale: 1.05, rotation: 10 }))
        //cityBoops[`${i+1}`] = useBoop({ scale: 1.05, rotation: 10 })
    }

    const [nextAnimation, nextTrigger] = useBoop({ x: 3 })
    const [closeAnimation, closeTrigger] = useBoop({ scale: 1.1 })

    const taiwanAnimation = useSpring({ marginLeft: open ? "-60%" : "0%" })

    return (
        <>
            <SEO title="Cities" />
            <div className={classes.container}>
                <div className={classes.taiwanMap}>
                    <animated.div
                        style={{
                            ...taiwanAnimation,
                            ...{
                                position: "relative",
                                width: "100%",
                                height: "100%",
                            },
                        }}
                    >
                        <Image
                            className={classes.map}
                            image={data.map}
                            loading="eager"
                            durationFadeIn={100}
                            imgStyle={{
                                objectFit: "fill",
                            }}
                        />
                        {markers.map(
                            ({
                                name,
                                marginSide,
                                marginTop,
                                data,
                                index,
                                icon,
                            }) => (
                                <div
                                    key={name}
                                    style={{
                                        left: marginSide,
                                        top: marginTop,
                                        position: "absolute",
                                    }}
                                >
                                    <IconButton
                                        onClick={() =>
                                            handleDrawerOpen(data, index)
                                        }
                                    >
                                        <animated.img
                                            src={icon}
                                            style={{
                                                ...{
                                                    width: "60px",
                                                    height: "60px",
                                                    padding: "3px",
                                                    borderRadius: "30px",
                                                },
                                                ...cityBoops[index - 1][0],
                                            }}
                                            className={
                                                data == city && open
                                                    ? classes.styleCityClicked
                                                    : classes.styleCity
                                            }
                                            onMouseEnter={
                                                cityBoops[index - 1][1]
                                            }
                                        />
                                    </IconButton>
                                    <div
                                        style={{
                                            color: "white",
                                            position: "absolute",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)",
                                            fontWeight: "bold",
                                            fontSize: "12px",
                                        }}
                                    >
                                        {name}
                                    </div>
                                </div>
                            )
                        )}
                    </animated.div>
                </div>
            </div>

            <Drawer
                className={classes.drawer}
                anchor="right"
                variant="persistent"
                open={open}
                classes={{ paper: classes.drawerPaper }}
            >
                <div className={classes.toolbar} />
                <div className={classes.drawerHeader}>
                    <IconButton
                        onClick={handleDrawerClose}
                        onMouseEnter={closeTrigger}
                    >
                        <animated.span
                            style={{ ...closeAnimation, ...{ height: "24px" } }}
                        >
                            <CloseIcon />
                        </animated.span>
                    </IconButton>
                </div>
                <City city={city} />
                <List>
                    <ListItem style={{ display: "block", textAlign: "center" }}>
                        <Button
                            onClick={() =>
                                handleDrawerOpen(
                                    markers[cityIndex].data,
                                    markers[cityIndex].index
                                )
                            }
                            onMouseEnter={nextTrigger}
                            variant="contained"
                            color="primary"
                        >
                            Next City: {markers[cityIndex].name}
                            <animated.span
                                style={{
                                    ...nextAnimation,
                                    ...{ height: "24px", marginLeft: "2px" },
                                }}
                            >
                                <ChevronRightIcon />
                            </animated.span>
                        </Button>
                    </ListItem>
                </List>
            </Drawer>
        </>
    )
}

export default CitiesPage

export const query = graphql`
    fragment City on MarkdownRemark {
        id
        frontmatter {
            name
            imgsrc
            video
        }
        html
    }
    query CitiesPage {
        map: file(relativePath: { eq: "taiwanmap.png" }) {
            ...Image
        }
        hualien: markdownRemark(
            frontmatter: { name: { eq: "Hualien" }, category: { eq: "city" } }
        ) {
            ...City
        }
        taipei: markdownRemark(
            frontmatter: { name: { eq: "Taipei" }, category: { eq: "city" } }
        ) {
            ...City
        }
        tainan: markdownRemark(
            frontmatter: { name: { eq: "Tainan" }, category: { eq: "city" } }
        ) {
            ...City
        }
        shifen: markdownRemark(
            frontmatter: { name: { eq: "Shifen" }, category: { eq: "city" } }
        ) {
            ...City
        }
        kaohsiung: markdownRemark(
            frontmatter: { name: { eq: "Kaohsiung" }, category: { eq: "city" } }
        ) {
            ...City
        }
        taichung: markdownRemark(
            frontmatter: { name: { eq: "Taichung" }, category: { eq: "city" } }
        ) {
            ...City
        }
    }
`
