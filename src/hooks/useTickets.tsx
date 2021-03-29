import { useState } from "react"
import firebase from "gatsby-plugin-firebase"
import { useCollection } from "react-firebase-hooks/firestore"
import useIsSignedIn from "./useIsSignedIn"

type Props = {
    query?: firebase.firestore.Query
    isSignedIn?: boolean
    constraints?: {
        field: string
        opStr: firebase.firestore.WhereFilterOp
        value: any
    }
}

export type TicketType = {
    id: string
    category: string
    prize: string
    person: string
    winner: boolean
    seen: boolean
}

export default function useTickets({
    query = firebase.firestore().collection("raffle"),
    isSignedIn = useIsSignedIn(),
    constraints,
}: Props) {
    const queryToUse = constraints
        ? query.where(constraints.field, constraints.opStr, constraints.value)
        : query

    const [value, loading, error] = useCollection(
        isSignedIn ? queryToUse : undefined
    )

    const tickets = value
        ? value.docs.map(doc => {
              const data = doc.data()
              return {
                  id: doc.id,
                  category: data.category as string,
                  prize: data.prize as string,
                  person: data.person as string,
                  winner: !!data.winner,
                  seen: !!data.seen,
              }
          })
        : []

    return [tickets, loading, error]
}
