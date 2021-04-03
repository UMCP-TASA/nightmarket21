import React from "react"
import {
    AppBar,
    Button,
    Toolbar,
    Hidden,
    Typography,
    Grid,
    makeStyles,
} from "@material-ui/core"

import Logo from "components/Logo"
import HeaderLink from "./HeaderLink"
import HeaderProfileMenu from "./HeaderProfileMenu"
import Cart from "components/Cart"
import { Link } from "gatsby"

const useStyles = makeStyles(theme => ({
    link: {
        textDecoration: "none",
        color: "inherit",
    },
    headerProfile: {
        marginLeft: theme.spacing(2),
    },
}))

type Props = {}

const Header = ({}: Props) => {
    const classes = useStyles()
    return (
        <>
            <AppBar component="header" position="fixed" color="inherit">
                <Toolbar>
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                            <Link to="/" className={classes.link}>
                                <Grid container alignItems="center" spacing={1}>
                                    <Grid item>
                                        <Logo />
                                    </Grid>
                                </Grid>
                            </Link>
                        </Grid>

                        <Hidden smDown>
                            <Grid item>
                                <HeaderLink to="/" text="Home" />
                                <HeaderLink to="/raffle" text="Raffle" />
                            </Grid>
                        </Hidden>

                        <Grid item>
                            <Cart />
                            <Hidden smDown>
                                <HeaderProfileMenu
                                    className={classes.headerProfile}
                                />
                            </Hidden>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

            {/* Additional toolbar here to make sure content doesn't get hidden behind it */}
            <Toolbar />
        </>
    )
}

export default Header
