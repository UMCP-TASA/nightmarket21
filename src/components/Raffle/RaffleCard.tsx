import React from "react"
import firebase from "gatsby-plugin-firebase"
import { useCollection } from "react-firebase-hooks/firestore"
import {
    Card,
    CardHeader,
    CardContent,
    CircularProgress,
    Typography,
    List,
    makeStyles,
} from "@material-ui/core"

import ClientOnly from "components/ClientOnly"
import useIsSignedIn from "hooks/useIsSignedIn"
import { LinkButton } from "components/Buttons"
import RaffleTicket from "./RaffleTicket"
import { CollectionQuery } from "./index"

type Props = CollectionQuery & {
    isSignedIn?: boolean
}

const RaffleCard = ({
    isSignedIn = useIsSignedIn(),
    docs,
    loading,
    error,
}: Props) => {
    return (
        <Card>
            <CardHeader title="Tickets" />
            <CardContent>
                <ClientOnly>
                    {isSignedIn ? (
                        <>
                            {error && (
                                <Typography>
                                    Error: {JSON.stringify(error)}
                                </Typography>
                            )}
                            {loading && <CircularProgress />}

                            {docs && (
                                <List>
                                    {docs.map(doc => (
                                        <RaffleTicket doc={doc} key={doc.id} />
                                    ))}
                                </List>
                            )}
                        </>
                    ) : (
                        <>
                            <Typography align="center">
                                Please sign in to see your tickets
                            </Typography>
                            <LinkButton to="/app/signin">Sign In</LinkButton>
                        </>
                    )}
                </ClientOnly>
            </CardContent>
        </Card>
    )
}

export default RaffleCard
