/**
 * Transfer list code from Material-UI Transfer List
 * https://material-ui.com/components/transfer-list/
 */

import React from "react"
import firebase from "gatsby-plugin-firebase"
import {
    Card,
    CardHeader,
    CardContent,
    CircularProgress,
} from "@material-ui/core"
import useIsSignedIn from "hooks/useIsSignedIn"

import { CollectionQuery } from "./index"
import TransferList from "components/TransferList"
import { ConfirmationNumberSharp } from "@material-ui/icons"

type Props = CollectionQuery & {
    isSignedIn?: boolean
}

type Prizes = "Switch" | "Apple Watch"

type TicketItem = {
    id: string
    doc: firebase.firestore.QueryDocumentSnapshot<
        firebase.firestore.DocumentData
    >
    prevState: Prizes
}

const LEFT = "Switch"
const RIGHT = "Apple Watch"

const getID = (item: TicketItem) => item.id

const PremiumTickets = ({
    isSignedIn = useIsSignedIn(),
    docs,
    loading,
    error,
}: Props) => {
    const items: TicketItem[] = docs
        ? docs.map(doc => ({
              id: doc.id,
              doc: doc,
              prevState: doc.get("prize") as Prizes,
          }))
        : []

    const handleConfirm = (
        leftList: TicketItem[],
        rightList: TicketItem[]
    ) => async () => {
        const batch = firebase.firestore().batch()

        leftList.forEach(item => {
            if (item.prevState !== LEFT) {
                batch.update(item.doc.ref, { prize: LEFT })
            }
        })

        rightList.forEach(item => {
            if (item.prevState !== RIGHT) {
                batch.update(item.doc.ref, { prize: RIGHT })
            }
        })

        await batch.commit()
        return {
            message: "",
        }
    }

    return (
        <Card>
            <CardHeader
                title="Manage Premium Tickets"
                titleTypographyProps={{ align: "center" }}
            />
            <CardContent>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <TransferList
                        initialLeft={items.filter(
                            item => item.prevState === LEFT
                        )}
                        initialRight={items.filter(
                            item => item.prevState === RIGHT
                        )}
                        titleLeft={`${LEFT} Tickets`}
                        titleRight={`${RIGHT} Tickets`}
                        getID={getID}
                        handleConfirm={handleConfirm}
                        icon={<ConfirmationNumberSharp />}
                    />
                )}
            </CardContent>
        </Card>
    )
}

export default PremiumTickets
