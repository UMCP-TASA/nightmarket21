import React from "react"
import firebase from "gatsby-plugin-firebase"
import { useCollection } from "react-firebase-hooks/firestore"
import { DocType } from "components/Raffle"
import { Table } from "components/Table"

const originHeaders = [
    {
        id: "name",
        label: "Origin",
    },
    {
        id: "basic",
        label: "Basic",
    },
    {
        id: "premium",
        label: "Premium",
    },
    {
        id: "total",
        label: "Total",
    },
]

const MetricTable = () => {
    const [value, loading, error] = useCollection(
        firebase.firestore().collection("raffle")
    )

    const allTickets: DocType[] = value ? value.docs : []
    const basicTickets = allTickets.filter(
        doc => doc.get("category") === "Basic"
    )
    const premiumTickets = allTickets.filter(
        doc => doc.get("category") === "Premium"
    )

    // Filter by origin
    const originFilter = (origin: string) => (doc: DocType) =>
        doc.get("origin") === origin

    const basicAccount = basicTickets.filter(originFilter("Account"))

    const basicPurchased = basicTickets.filter(originFilter("Purchased"))
    const premiumPurchased = premiumTickets.filter(originFilter("Purchased"))

    const basicGranted = basicTickets.filter(originFilter("Granted"))
    const premiumGranted = premiumTickets.filter(originFilter("Granted"))

    const originRows = [
        {
            name: "Account",
            basic: basicAccount.length,
            premium: 0,
            total: basicAccount.length
        },
        {
            name: "Purchased",
            basic: basicPurchased.length,
            premium: premiumPurchased.length,
            total: basicAccount.length + premiumPurchased.length
        },
        {
            name: "Granted",
            basic: basicGranted.length,
            premium: premiumGranted.length,
            total: basicGranted.length + premiumGranted.length
        },
        {
            name: "Total",
            basic: basicTickets.length,
            premium: premiumTickets.length,
            total: basicTickets.length + premiumTickets.length
        }
    ]

    return (
        <Table
            rows={originRows}
            headers={originHeaders}
            title="Ticket Origins"
            initialRowsPerPage={4}
            rowsPerPageOptions={[]}
        />
    )
}

export default MetricTable
