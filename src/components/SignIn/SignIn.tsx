import React from "react"
import firebase from "gatsby-plugin-firebase"
import { Button, Typography, makeStyles } from "@material-ui/core"

import SignInContent from "./SignInContent"
import SignInPopup from "./SignInPopup"

const useStyles = makeStyles(theme => ({}))

type Props = {}

const SignIn = ({}: Props) => {
    const [dialogOpen, setDialogOpen] = React.useState(false)

    return (
        <>
            {/* <Button variant="contained">
                <Menu />
                <PersonOutline />
            </Button> */}
            <SignInContent
                signedOut={
                    <>
                        <Typography>Please sign in</Typography>
                        <Button onClick={() => setDialogOpen(true)}>
                            Sign In
                        </Button>
                        <SignInPopup
                            open={dialogOpen}
                            handleClose={() => setDialogOpen(false)}
                        />
                    </>
                }
                signedIn={
                    <>
                        <Typography>{`Welcome ${
                            firebase.auth().currentUser?.displayName
                        }`}</Typography>
                        <Button onClick={() => firebase.auth().signOut()}>
                            Sign out
                        </Button>
                    </>
                }
            />
        </>
    )
}

export default SignIn
