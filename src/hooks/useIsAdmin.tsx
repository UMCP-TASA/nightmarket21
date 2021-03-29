import React from "react"
import firebase from "gatsby-plugin-firebase"

export default function useIsAdmin() {
    const [isAdmin, setIsAdmin] = React.useState(false)

    React.useEffect(() => {
        function handleStateChange(user: firebase.User | null) {
            if (!user) {
                setIsAdmin(false)
                return
            }

            user.getIdTokenResult()
                .then(idTokenResult => {
                    setIsAdmin(!!idTokenResult.claims.admin)
                })
                .catch(() => setIsAdmin(false))
        }
        // firebase.auth().onAuthStateChanged returns the unsubscribe function
        // So this line subscribes us to the listener, then we can call unsubscribe() on cleanup
        const unsubscribe = firebase
            .auth()
            .onAuthStateChanged(handleStateChange)

        return function cleanup() {
            unsubscribe()
        }
    }, [isAdmin])

    return isAdmin
}
