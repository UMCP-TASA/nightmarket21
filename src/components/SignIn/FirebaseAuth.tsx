import React from "react"
import firebase from "gatsby-plugin-firebase"
import { StyledFirebaseAuth } from "react-firebaseui"

export type FirebaseAuthProps = {
    signInSuccessWithAuthResult?: (
        authResult?: any,
        redirectUrl?: string
    ) => boolean
}

const FirebaseAuth = ({ signInSuccessWithAuthResult = () => false }) => (
    <StyledFirebaseAuth
        firebaseAuth={firebase.auth()}
        uiConfig={{
            signInFlow: "popup",
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                {
                    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    requireDisplayName: true,
                },
            ],
            callbacks: {
                signInSuccessWithAuthResult,
            },
        }}
    />
)

export default FirebaseAuth
