import React from "react"
import { graphql, PageProps } from "gatsby"
import { Grid, Container, Typography, makeStyles } from "@material-ui/core"
import { useShoppingCart } from "use-shopping-cart"
import { LinkButton } from "components/Buttons"

import SeaBackground from "assets/backgrounds/seaBackground.svg"
import SEO from "components/seo"
import Sparkle from "components/Sparkle"

const useStyles = makeStyles(theme => ({
    root: {
        display: "grid",
        placeItems: "center",
        height: "80vh",
        zIndex: 1,
    },
    background: {
        height: "100%",
        width: "100%",
        position: "absolute",
        top: "0",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        textAlign: "center",
        pointerEvents: "none",
        zIndex: -1,
    },
}))

const SuccessPage = ({}: PageProps) => {
    const classes = useStyles()
    const { clearCart } = useShoppingCart()

    React.useEffect(() => {
        clearCart()
    }, [])

    return (
        <>
            <SEO title="Success" />
            <SeaBackground className={classes.background} />
            <Container maxWidth="lg" className={classes.root}>
                <Grid
                    container
                    alignItems="center"
                    justify="center"
                    direction="column"
                    spacing={4}
                >
                    <Grid item>
                        <Typography variant="h1" align="center">
                            <Sparkle>Successfully purchased tickets!</Sparkle>
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant="h4" align="center">
                            Your tickets may take a while to generate! If they
                            do not show up in your dashboard within 15 minutes,
                            please email us at <b>umcptasa@gmail.com</b>
                        </Typography>
                    </Grid>

                    <Grid item>
                        <LinkButton
                            to="/raffle"
                            variant="contained"
                            fullWidth
                            color="primary"
                        >
                            Return to Dashboard
                        </LinkButton>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default SuccessPage
