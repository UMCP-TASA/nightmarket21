import React from "react"
import { Grid, Typography, SvgIconTypeMap, makeStyles } from "@material-ui/core"
import { OverridableComponent } from "@material-ui/core/OverridableComponent"
import { globalHistory } from "@reach/router"
import { Link } from "gatsby"

const useStyles = makeStyles(theme => ({
    link: {
        textDecoration: "none",
        color: "inherit",
    },
}))

type Props = {
    to: string
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>
    name: string
}

const FooterLinkButton = ({ to, Icon, name }: Props) => {
    const classes = useStyles()
    const isActive = globalHistory.location.pathname === to
    return (
        <Link
            to={to}
            // swipe
            // direction="left"
            className={classes.link}
        >
            <Grid
                container
                alignItems="center"
                justify="center"
                direction="column"
            >
                <Icon color={isActive ? "primary" : "inherit"} />
                <Typography
                    variant="subtitle2"
                    align="center"
                    color={isActive ? "primary" : "initial"}
                >
                    {name}
                </Typography>
            </Grid>
        </Link>
    )
}

export default FooterLinkButton
