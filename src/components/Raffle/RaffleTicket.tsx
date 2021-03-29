import React from "react"
import firebase from "gatsby-plugin-firebase"
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import { ConfirmationNumberSharp } from "@material-ui/icons"

type Props = {
    doc: firebase.firestore.QueryDocumentSnapshot<
        firebase.firestore.DocumentData
    >
}

/**
 * Just a placeholder for now
 * @param param0
 */
const RaffleTicket = ({ doc }: Props) => (
    <ListItem>
        <ListItemIcon>
            <ConfirmationNumberSharp />
        </ListItemIcon>
        <ListItemText
            primary={doc.id}
            secondary={`Category: ${doc.get("category")}`}
        />
    </ListItem>
)

export default RaffleTicket
