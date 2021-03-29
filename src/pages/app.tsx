import React from "react"
import { Router } from "@reach/router"
import { PageProps } from "gatsby"

import PrivateRoute from "components/PrivateRoute"
import AdminPage from "./app/admin"
import ProfilePage from "./app/profile"
import SignInPage from "./app/signin"
import useIsSignedIn from "hooks/useIsSignedIn"

const AppPage = (props: PageProps) => {
    const isSignedIn = useIsSignedIn()
    return (
        <Router>
            <PrivateRoute
                {...props}
                path="/app/admin"
                component={AdminPage}
                isSignedIn={isSignedIn}
            />
            <PrivateRoute
                {...props}
                path="/app/profile"
                component={ProfilePage}
                isSignedIn={isSignedIn}
            />
            <SignInPage {...props} />
        </Router>
    )
}

export default AppPage
