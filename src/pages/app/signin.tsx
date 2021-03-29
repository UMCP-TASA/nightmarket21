import React from "react"
import { PageProps, navigate } from "gatsby"
import { Container, Grid, Typography, makeStyles } from "@material-ui/core"

import SEO from "components/seo"
import useIsSignedIn from "hooks/useIsSignedIn"
import FAQ from "components/FAQ"
import { FirebaseAuth } from "components/SignIn"
import ClientOnly from "components/ClientOnly"

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4),
        height: "100%",
    },
    grid: {
        height: "100%",
    },
}))

const SignInPage = ({}: PageProps) => {
    const classes = useStyles()
    const isSignedIn = useIsSignedIn()
    if (isSignedIn) {
        navigate("/app/profile")
    }

    return (
        <>
            <SEO title="Sign In" />
            <Container maxWidth="md" className={classes.root}>
                <Grid
                    container
                    className={classes.grid}
                    alignItems="center"
                    direction="column"
                    spacing={4}
                >
                    <Grid item>
                        <Typography variant="h3" align="center">
                            Sign In
                        </Typography>
                    </Grid>
                    <Grid item>
                        <ClientOnly>
                            <FirebaseAuth />
                        </ClientOnly>
                    </Grid>

                    <Grid item>
                        <FAQ />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
export default SignInPage
