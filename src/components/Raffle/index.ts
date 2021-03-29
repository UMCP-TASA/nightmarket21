export { default as RaffleCard } from "./RaffleCard"
export { default as RaffleTicket } from "./RaffleTicket"
export { default as StripeItemCard } from "./StripeItemCard"
export { default as PremiumTickets } from "./PremiumTickets"

export { default as RaffleTab } from "./RaffleTab"
export { default as RaffleTicketList } from "./RaffleTicketList"
export { default as RaffleTable } from "./RaffleTable"

export type QueryType = firebase.firestore.QuerySnapshot<
    firebase.firestore.DocumentData
>

export type DocType = firebase.firestore.QueryDocumentSnapshot<
    firebase.firestore.DocumentData
>

export type CollectionQuery = {
    docs: DocType[] | undefined
    loading: boolean
    error?: Error
}
