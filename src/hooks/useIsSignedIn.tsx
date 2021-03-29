import React from "react"
import firebase from "gatsby-plugin-firebase"

export default function useIsSignedIn() {
    const [isSignedIn, setSignedIn] = React.useState(false)

    React.useEffect(() => {
        function handleStateChange(user: firebase.User | null) {
            setSignedIn(!!user)
        }
        // firebase.auth().onAuthStateChanged returns the unsubscribe function
        // So this line subscribes us to the listener, then we can call unsubscribe() on cleanup
        const unsubscribe = firebase
            .auth()
            .onAuthStateChanged(handleStateChange)

        return function cleanup() {
            unsubscribe()
        }
    }, [setSignedIn])

    return isSignedIn
}
