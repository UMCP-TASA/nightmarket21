/**
 * Our footer component. Currently hides content unless the screen size is mobile sized
 */
import React from "react"
import { AppBar, Toolbar, Grid, Hidden, makeStyles } from "@material-ui/core"
import {
    HomeOutlined,
    MapOutlined,
    FastfoodOutlined,
    ConfirmationNumberOutlined,
    PersonOutline,
} from "@material-ui/icons"
import FooterLinkButton from "./FooterLinkButton"
import useIsSignedIn from "hooks/useIsSignedIn"

const useStyles = makeStyles(theme => ({
    appbar: {
        top: "auto",
        bottom: 0,
        textDecoration: "none",
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
}))

type Props = {}

const Footer = ({}: Props) => {
    const classes = useStyles()
    const isSignedIn = useIsSignedIn()
    return (
        <Hidden mdUp>
            <Toolbar />
            <AppBar
                color="default"
                className={classes.appbar}
                component="footer"
            >
                <Toolbar>
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item xs={2}>
                            <FooterLinkButton
                                to="/"
                                Icon={HomeOutlined}
                                name="Home"
                            />
                        </Grid>
                        
                        <Grid item xs={2}>
                            <FooterLinkButton
                                to="/raffle"
                                Icon={ConfirmationNumberOutlined}
                                name="Raffle"
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <FooterLinkButton
                                to={isSignedIn ? "/app/profile" : "/app/signin"}
                                Icon={PersonOutline}
                                name="Profile"
                            />
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Hidden>
    )
}

export default Footer
