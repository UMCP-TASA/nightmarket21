import React from "react"
import { makeStyles, Typography, useTheme } from "@material-ui/core"
import { useTransition, animated } from "react-spring"
import { Link, GatsbyLinkProps } from "gatsby"

const useStyles = makeStyles(theme => ({
    link: {
        margin: theme.spacing(2),
        textDecoration: "none",
        textTransform: "uppercase",
        display: "inline-block",
        position: "relative",
        color: "inherit",
    },
    active: {
        color: theme.palette.primary.main,
        "& #link-highlight": {
            backgroundColor: theme.palette.primary.main,
            position: "absolute",
            bottom: -theme.spacing(0.5),
            width: "100%",
            height: "3px",
        },
    },
    box: {
        backgroundColor: theme.palette.primary.main,
        position: "absolute",
        bottom: -theme.spacing(0.5),
        height: "3px",
    },
}))

type Props = Omit<GatsbyLinkProps<{}>, "ref"> & {
    text: string
}

const HeaderLink = ({ to, text, ...rest }: Props) => {
    const classes = useStyles()
    const theme = useTheme()
    const [show, setShow] = React.useState(false)

    const transitions = useTransition(show, {
        from: { width: "0%", left: "0%" },
        enter: { width: "100%", left: "0%" },
        leave: { width: "0%", left: "100%" },
    })

    return (
        <Link
            className={classes.link}
            to={to}
            activeClassName={classes.active}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            // cover
            // direction="down"
            // bg={theme.palette.primary.main}
            {...rest}
        >
            <Typography>{text}</Typography>
            {transitions((style, item) => (
                <>
                    {item && (
                        <animated.div className={classes.box} style={style} />
                    )}
                </>
            ))}
            <div id="link-highlight" />
        </Link>
    )
}

export default HeaderLink
