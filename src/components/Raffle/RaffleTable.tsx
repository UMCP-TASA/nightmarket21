import React from "react"
import { Table, TableProps } from "components/Table"
import { DocType } from "components/Raffle"

type Props = TableProps & {
    tickets: DocType[]
    loading?: boolean
    error?: Error
    showEmail?: boolean
    title: string
}

const ALL_COLUMNS = [
    {
        id: "name",
        label: "Ticket",
    },
    {
        id: "category",
        label: "Category",
    },
    {
        id: "prize",
        label: "Prize",
    },
    {
        id: "email",
        label: "Email",
    },
]

const RaffleTable = ({
    tickets,
    loading,
    error,
    showEmail = false,
    title,
    ...rest
}: Props) => {
    const columns = showEmail
        ? ALL_COLUMNS
        : ALL_COLUMNS.slice(0, ALL_COLUMNS.length - 1)

    const rows = tickets.map(doc => {
        const data = doc.data()
        const main = {
            name: doc.id,
            category: data["category"],
            prize: data["prize"],
            winner: data["winner"],
        }
        return showEmail ? { ...main, email: data["person"] } : main
    })

    return <Table rows={rows} headers={columns} title={title} {...rest} />
}

export default RaffleTable
