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
import { CssBaseline } from "@material-ui/core"
import Header from "components/Header"
import Footer from "components/Footer"

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => (
    <>
        <CssBaseline />
        <Header />
        <main>{children}</main>
        <Footer />
    </>
)

export default Layout
