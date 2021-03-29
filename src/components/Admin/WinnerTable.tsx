import React from "react"
import firebase from "gatsby-plugin-firebase"
import { useCollection } from "react-firebase-hooks/firestore"
import { RaffleTable } from "components/Raffle"

const WinnerTable = () => {
    const [value, loading, error] = useCollection(
        firebase.firestore().collection("winners")
    )

    return (
        <RaffleTable
            tickets={value ? value.docs : []}
            showEmail
            title="Winners"
        />
    )
}

export default WinnerTable
