import React from "react"
import { Container, Typography, Grid, makeStyles } from "@material-ui/core"
import { PageProps } from "gatsby"

import SEO from "components/seo"
import useIsAdmin from "hooks/useIsAdmin"
import { LinkButton } from "components/Buttons"
import {
    ChooseWinner,
    GrantAdmin,
    GrantTicket,
    MetricTable,
    WinnerTable,
} from "components/Admin"

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
}))

const AdminPage = ({}: PageProps) => {
    const classes = useStyles()
    const isAdmin = useIsAdmin()

    if (!isAdmin) {
        return (
            <>
                <SEO title="Admin" />
                <Typography align="center">
                    You do not have access to this page
                </Typography>
                <LinkButton to="/app/profile">Return to Account</LinkButton>
            </>
        )
    }

    return (
        <>
            <SEO title="Admin" />
            <Container maxWidth="lg" className={classes.root}>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justify="center"
                    spacing={3}
                >
                    <Grid item>
                        <Typography align="center" variant="h4">
                            Admin Panel
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        container
                        alignItems="center"
                        justify="center"
                        spacing={2}
                    >
                        <Grid item xs={12} md={4}>
                            <GrantAdmin />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <GrantTicket />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <ChooseWinner />
                        </Grid>
                        <Grid item xs={12}>
                            <MetricTable />
                        </Grid>
                        <Grid item xs={12}>
                            <WinnerTable />
                        </Grid>
                    </Grid>
                </Grid> 
            </Container>
        </>
    )
}

export default AdminPage
