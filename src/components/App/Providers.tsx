/**
 * Our component that wraps the entire application.
 * It handles globals, provides theme, and holds the header and footer components
 * Normally we would use it in a wrapRootElement or wrapPageElement in gatsby-browser.js and gatsby-ssr.js
 * But because we're using gatsby-plugin-transition-link for those sweet transitions, we're
 * calling this component in the gatsby-config.js under the gatsby-plugin-transition-link plugin
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 * See: https://transitionlink.tylerbarnes.ca/docs/installation/
 */

import React from "react"
import { ThemeProvider } from "@material-ui/core"
import { Globals } from "react-spring"
import { CartProvider } from "use-shopping-cart"

import { NotificationProvider } from "components/Notification"
import usePrefersReducedMotion from "hooks/usePrefersReducedMotion"
import theme from "./theme"
import { getStripe } from "utils/stripe"

type Props = {
    children: React.ReactNode
}

const Providers = ({ children }: Props) => {
    const prefersReducedMotion = usePrefersReducedMotion()

    React.useEffect(() => {
        // React spring global setting. This allows us to have better reduce motion accessibility!
        // All animations will be skipped if the user has the prefers reduced motion setting on
        Globals.assign({
            skipAnimation: prefersReducedMotion,
        })
    }, [prefersReducedMotion])

    return (
        <ThemeProvider theme={theme}>
            <CartProvider
                mode="checkout-session"
                stripe={getStripe()}
                currency="USD"
                language="EN"
            >
                <NotificationProvider>{children}</NotificationProvider>
            </CartProvider>
        </ThemeProvider>
    )
}

export default Providers
