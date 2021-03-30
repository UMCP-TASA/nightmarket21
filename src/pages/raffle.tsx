import React from "react"
import firebase from "gatsby-plugin-firebase"
import { PageProps, graphql } from "gatsby"
import {
    Container,
    Card,
    CardHeader,
    CardContent,
    CircularProgress,
    Grid,
    Hidden,
    Typography,
    makeStyles,
} from "@material-ui/core"
import { RafflePageQuery } from "graphql-types"
import { useCollection } from "react-firebase-hooks/firestore"

import SEO from "components/seo"
import { PremiumTickets, StripeItemCard, RaffleTable } from "components/Raffle"
import { LinkButton } from "components/Buttons"
import useIsSignedIn from "hooks/useIsSignedIn"
import RaffleWinner from "components/Raffle/RaffleWinner"

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
    center: {
        display: "grid",
        placeItems: "center",
    },
    cardHeader: {
        paddingBottom: theme.spacing(4),
    },
    grow: {
        flexGrow: 1,
    },
}))

const a11yProps = (i: number) => ({
    id: `raffle-tab-option-${i}`,
    "aria-controls": `raffle-tabpanel-${i}`,
})

const basicPrizes = [
    "Bluetooth Speaker",
    "Boba Set",
    "The Comfy Hoodie",
    "Appa Plush",
    "Weighted Blanket",
    "Duck Plushie",
]

const RafflePage = ({ data }: PageProps<RafflePageQuery>) => {
    const classes = useStyles()
    const isSignedIn = useIsSignedIn()
    const [value, loading, error] = useCollection(
        isSignedIn
            ? firebase
                  .firestore()
                  .collection("raffle")
                  .where("person", "==", firebase.auth().currentUser?.email)
            : undefined
    )

    const { premium, basic } = data

    const premiumTickets = value?.docs.filter(
        doc => doc.get("category") === "Premium"
    )

    const winningTickets = value
        ? value.docs.filter(doc => doc.get("winner"))
        : []

    return (
        <>
            <SEO title="Raffle" />
            <Container maxWidth="xl" className={classes.root}>
                <RaffleWinner winningTickets={winningTickets} />
                <Grid
                    container
                    alignItems="stretch"
                    alignContent="stretch"
                    justify="center"
                    spacing={2}
                >
                    <Grid item xs={12} md={6} container justify="center">
                        <Card className={classes.root}>
                            <CardHeader
                                className={classes.cardHeader}
                                title={"Purchase Tickets"}
                                titleTypographyProps={{ align: "center" }}
                            />
                            <Grid
                                container
                                alignItems="stretch"
                                alignContent="stretch"
                                direction="column"
                                justify="space-between"
                                spacing={4}
                            >
                                {basic && (
                                    <Grid item xs={12}>
                                        <StripeItemCard
                                            title="Basic Tickets"
                                            data={basic.nodes}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                align="center"
                                            >
                                                1 ticket = $1
                                            </Typography>
                                            <Typography
                                                variant="subtitle2"
                                                align="center"
                                            >
                                                Every ticket is an entry to win
                                                one of the following prizes:
                                            </Typography>

                                            <Typography
                                                component="div"
                                                variant="body2"
                                            >
                                                <Grid
                                                    container
                                                    justify="center"
                                                >
                                                    <Grid item xs={6}>
                                                        <ul>
                                                            {basicPrizes
                                                                .slice(0, 4)
                                                                .map(prize => (
                                                                    <li
                                                                        key={
                                                                            prize
                                                                        }
                                                                    >
                                                                        {prize}
                                                                    </li>
                                                                ))}
                                                        </ul>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <ul>
                                                            {basicPrizes
                                                                .slice(4)
                                                                .map(prize => (
                                                                    <li
                                                                        key={
                                                                            prize
                                                                        }
                                                                    >
                                                                        {prize}
                                                                    </li>
                                                                ))}
                                                        </ul>
                                                    </Grid>
                                                </Grid>
                                            </Typography>
                                        </StripeItemCard>
                                    </Grid>
                                )}
                                {premium && (
                                    <Grid item xs={12}>
                                        <StripeItemCard
                                            title="Premium Tickets"
                                            data={premium.nodes}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                align="center"
                                            >
                                                1 ticket = $3 | 5 tickets = $14
                                                | 10 tickets = $25
                                            </Typography>
                                            <Typography
                                                align="center"
                                                gutterBottom
                                            >
                                                Buy to win an Apple Watch or
                                                a Nintendo Switch!
                                            </Typography>
                                            <Typography align="center">
                                                Premium tickets are special
                                                tickets that you can choose to
                                                enter into either the Apple Watch
                                                raffle <b>OR</b> the Switch
                                                raffle. Tickets are put into the
                                                Switch raffle pool by default,
                                                but you can change which prize
                                                your tickets go towards by
                                                signing in!
                                            </Typography>
                                        </StripeItemCard>
                                    </Grid>
                                )}
                            </Grid>
                        </Card>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={6}
                        container
                        alignItems="stretch"
                        alignContent="stretch"
                        justify="space-between"
                    >
                        <Grid item xs={12}>
                            {isSignedIn ? (
                                <>
                                    {error && (
                                        <Typography>
                                            Error: {JSON.stringify(error)}
                                        </Typography>
                                    )}
                                    {loading && <CircularProgress />}

                                    {value && (
                                        <RaffleTable
                                            title={"Your Tickets"}
                                            tickets={value.docs}
                                            rowsPerPageOptions={[
                                                5,
                                                10,
                                                20,
                                                50,
                                                100,
                                            ]}
                                        />
                                    )}
                                </>
                            ) : (
                                <Card>
                                    <CardHeader
                                        title="Please sign in to see your tickets"
                                        titleTypographyProps={{
                                            align: "center",
                                        }}
                                    />
                                    <CardContent className={classes.center}>
                                        <LinkButton
                                            to="/app/signin"
                                            color="primary"
                                            variant="contained"
                                        >
                                            Sign In
                                        </LinkButton>
                                    </CardContent>
                                </Card>
                            )}
                        </Grid>

                        {winningTickets.length > 0 && (
                            <Grid item xs={12}>
                                <RaffleTable
                                    title={"⭐ Winning Tickets ⭐"}
                                    tickets={winningTickets}
                                    rowsPerPageOptions={[]}
                                    initialRowsPerPage={winningTickets.length}
                                />
                            </Grid>
                        )}

                        <Grid item xs={12}>
                            {isSignedIn && (
                                <PremiumTickets
                                    isSignedIn={isSignedIn}
                                    docs={premiumTickets}
                                    loading={loading}
                                    error={error}
                                />
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default RafflePage

export const query = graphql`
    query RafflePage {
        premium: allStripePrice(
            filter: {
                product: { name: { regex: "/Premium/" }, active: { eq: true } }
            }
            sort: { fields: unit_amount }
        ) {
            nodes {
                ...StripeItem
            }
        }

        basic: allStripePrice(
            filter: {
                product: { name: { regex: "/Basic/" }, active: { eq: true } }
            }
            sort: { fields: unit_amount }
        ) {
            nodes {
                ...StripeItem
            }
        }
    }
`
