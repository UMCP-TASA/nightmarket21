import React from "react"
import {
    Dialog,
    DialogProps,
    DialogTitle,
    DialogActions,
    Button,
} from "@material-ui/core"
import FirebaseAuth, { FirebaseAuthProps } from "./FirebaseAuth"

// Config info can be found at https://firebaseopensource.com/projects/firebase/firebaseui-web/

type Props = DialogProps &
    FirebaseAuthProps & {
        handleClose: () => void
        title?: string
    }

const SignInPopup = ({
    handleClose,
    title = "Sign-In",
    signInSuccessWithAuthResult,
    ...rest
}: Props) => (
    <Dialog {...rest} onClose={handleClose} aria-labelledby="sign-in-title">
        <DialogTitle id="sign-in-title">{title}</DialogTitle>

        <FirebaseAuth
            signInSuccessWithAuthResult={signInSuccessWithAuthResult}
        />

        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Close
            </Button>
        </DialogActions>
    </Dialog>
)

export default SignInPopup
