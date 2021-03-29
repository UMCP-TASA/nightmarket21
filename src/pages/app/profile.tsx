import React from "react"
import { PageProps } from "gatsby"
import firebase from "gatsby-plugin-firebase"
import {
    Button,
    Container,
    Grid,
    Typography,
    makeStyles,
} from "@material-ui/core"

import SEO from "components/seo"
import ClientOnly from "components/ClientOnly"
import FAQ from "components/FAQ"
import { DeleteAccountButton, LinkButton } from "components/Buttons"
import { isBrowser } from "@utils"
import useIsAdmin from "hooks/useIsAdmin"

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4),
    },
}))

const ProfilePage = ({}: PageProps) => {
    const classes = useStyles()
    const isAdmin = useIsAdmin()

    return (
        <>
            <SEO title="Profile" />
            <Container maxWidth="md" className={classes.root}>
                <Grid
                    container
                    alignItems="center"
                    justify="center"
                    direction="column"
                    spacing={4}
                >
                    <Grid item>
                        <Typography variant="h3" align="center">
                            Account
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography align="center" gutterBottom>
                            Welcome,{" "}
                            <b>
                                {isBrowser()
                                    ? firebase.auth().currentUser?.displayName
                                    : ""}
                            </b>
                        </Typography>
                        <Typography align="center">
                            UID:{" "}
                            {isBrowser()
                                ? firebase.auth().currentUser?.uid
                                : ""}
                        </Typography>
                    </Grid>

                    {isAdmin ? (
                        <Grid item>
                            <LinkButton
                                to="/app/admin"
                                variant="contained"
                                color="secondary"
                            >
                                Go to Admin Panel
                            </LinkButton>
                        </Grid>
                    ) : (
                        <></>
                    )}

                    <Grid item>
                        <ClientOnly>
                            <Button
                                onClick={() => firebase.auth().signOut()}
                                variant="contained"
                                color="primary"
                            >
                                Sign out
                            </Button>
                        </ClientOnly>
                    </Grid>

                    <Grid item>
                        <FAQ />
                    </Grid>

                    <Grid item>
                        <DeleteAccountButton />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default ProfilePage
