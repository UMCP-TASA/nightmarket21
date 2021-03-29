import React from "react"
import { CircularProgress, Typography, List } from "@material-ui/core"

import RaffleTicket from "./RaffleTicket"
import { CollectionQuery } from "./index"
import { LinkButton } from "components/Buttons"

import useIsSignedIn from "hooks/useIsSignedIn"

type Props = CollectionQuery & {
    isSignedIn?: boolean
}

const RaffleTicketList = ({
    isSignedIn = useIsSignedIn(),
    docs,
    loading,
    error,
}: Props) => {
    return (
        <>
            {isSignedIn ? (
                <>
                    {error && (
                        <Typography>Error: {JSON.stringify(error)}</Typography>
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
                    <LinkButton to="/signin">Sign In</LinkButton>
                </>
            )}
        </>
    )
}

export default RaffleTicketList
