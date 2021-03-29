import React from "react"
import firebase from "gatsby-plugin-firebase"
import { navigate } from "@reach/router"
import { useShoppingCart } from "use-shopping-cart"

import { getStripe } from "utils/stripe"
import { SubmitButton } from "components/Buttons"
import useIsSignedIn from "hooks/useIsSignedIn"

type Item = {
    price: string
    quantity: number
}

type Props = {
    handleClose: () => void
}

const Checkout = ({ handleClose }: Props) => {
    const { cartDetails } = useShoppingCart()
    const isSignedIn = useIsSignedIn()

    const handleNotSignedIn = () => {
        handleClose()
        if (window.location.pathname !== "/app/signin/") navigate("/app/signin")
    }

    const handleClick = async () => {
        const stripe = await getStripe()
        if (!stripe) return { message: "Stripe couldn't be initialized" }

        const items: Item[] = []
        Object.entries(cartDetails).forEach(([key, value]) =>
            items.push({
                price: key,
                quantity: value.quantity,
            })
        )

        const email = firebase.auth().currentUser?.email as string

        const createCheckoutSession = firebase
            .app()
            .functions("us-east4")
            .httpsCallable("createCheckoutSession")

        const response = await createCheckoutSession({
            person: email,
            items,
            successUrl: `${window.location.origin}/success`,
            cancelUrl: `${window.location.origin}/raffle`,
        })

        let message = ""

        if (response.data.status == "error") {
            message =
                "An error occured with creating a checkout session. Please try again"
        } else {
            const { error } = await stripe.redirectToCheckout({
                sessionId: response.data.sessionId as string,
            })

            if (error) {
                message = "An error occured. Please try again"
            }
        }

        return {
            status: response.data.status,
            message,
        }
    }

    return (
        <SubmitButton
            initialText={isSignedIn ? "Checkout" : "Please Sign In to Checkout"}
            handleClick={handleClick}
            onClick={isSignedIn ? undefined : handleNotSignedIn}
            fullWidth
            color="primary"
            variant="contained"
        />
    )
}

export default Checkout
