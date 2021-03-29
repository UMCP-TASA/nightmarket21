import React from "react"
import firebase from "gatsby-plugin-firebase"
import {
    Button,
    ButtonProps,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@material-ui/core"

import { SignInPopup } from "components/SignIn"
import { NotificationContext } from "components/Notification"

type Props = ButtonProps

const DeleteAccountButton = ({ ...rest }: Props) => {
    const [open, setOpen] = React.useState(false)
    const handleClose = () => setOpen(false)

    const [signInOpen, setSignInOpen] = React.useState(false)
    const { setNotification } = React.useContext(NotificationContext)

    const signInSuccessWithAuthResult = () => {
        firebase
            .auth()
            .currentUser?.delete()
            .then(() => {
                setSignInOpen(false)
                setNotification({
                    severity: "success",
                    message: "Successfully deleted account!",
                })
            })
            .catch(error => {
                setSignInOpen(false)
                setNotification({
                    severity: "error",
                    message: `Something went wrong! ${error}`,
                })
            })

        // No redirect
        return false
    }

    return (
        <>
            <Button onClick={() => setOpen(true)} {...rest}>
                Delete Account
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="confirm-delete-title"
                aria-describedby="confirm-delete-text"
            >
                <DialogTitle id="confirm-delete-title">
                    Are you sure you want to delete?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="confirm-delete-text">
                        Deleting your account will also delete all of your
                        raffle tickets. Deleting your account is irreversible!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpen(false)
                            setSignInOpen(true)
                        }}
                    >
                        Delete
                    </Button>
                    <Button onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            <SignInPopup
                open={signInOpen}
                handleClose={() => setSignInOpen(false)}
                title="Please sign in again to confirm deletion"
                signInSuccessWithAuthResult={signInSuccessWithAuthResult}
            />
        </>
    )
}

export default DeleteAccountButton
