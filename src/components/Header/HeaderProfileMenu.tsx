import React from "react"
import firebase from "gatsby-plugin-firebase"
import { navigate } from "gatsby"
import { Menu, MenuItem, Avatar, Button, makeStyles } from "@material-ui/core"
import { Menu as MenuIcon, PersonOutline } from "@material-ui/icons"
import clsx from "clsx"

import useIsSignedIn from "hooks/useIsSignedIn"

const useStyles = makeStyles(theme => ({
    root: {
        borderRadius: theme.shape.borderRadius * 2,
    },
    avatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        fontSize: "1rem",
        marginLeft: theme.spacing(1),
    },
}))

const getPhotoURL = ({ providerData }: firebase.User) =>
    providerData.length > 0 && providerData[0] && providerData[0].photoURL
        ? providerData[0].photoURL
        : ""

const getFirstLetterFromWords = (name: string) =>
    name
        .split(" ")
        .map(word => word.charAt(0))
        .join("")

type Props = {
    className?: string
}

const HeaderProfileMenu = ({ className }: Props) => {
    const classes = useStyles()
    const isSignedIn = useIsSignedIn()
    const displayName = isSignedIn
        ? (firebase.auth().currentUser?.displayName as string) // casting because we know we'll get string
        : "Anonymous User"

    const anchorRef = React.useRef<HTMLButtonElement>(null)
    const [menuOpen, setMenuOpen] = React.useState(false)
    const handleClose = () => setMenuOpen(false)
    const navigateAndClose = (to: string) => () => {
        navigate(to)
        setMenuOpen(false)
    }

    return (
        <>
            <Button
                className={clsx(className, classes.root)}
                aria-controls="profile-menu"
                aria-haspopup="true"
                ref={anchorRef}
                variant="outlined"
                onClick={() => setMenuOpen(true)}
            >
                <MenuIcon />
                <Avatar
                    alt={`Avatar image for ${displayName}`}
                    src={
                        isSignedIn
                            ? getPhotoURL(
                                  firebase.auth().currentUser as firebase.User
                              )
                            : ""
                    }
                    className={classes.avatar}
                >
                    {isSignedIn ? (
                        getFirstLetterFromWords(displayName)
                    ) : (
                        <PersonOutline />
                    )}
                </Avatar>
            </Button>
            <Menu
                id="profile-menu"
                anchorEl={anchorRef.current}
                getContentAnchorEl={null} // so that we can use anchorOrigin
                open={menuOpen}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
            >
                {isSignedIn ? (
                    <MenuItem
                        onClick={navigateAndClose("/app/profile")}
                        divider
                    >
                        Account Settings
                    </MenuItem>
                ) : (
                    <MenuItem onClick={navigateAndClose("/app/signin")} divider>
                        Sign In
                    </MenuItem>
                )}

                <MenuItem
                    onClick={navigateAndClose("/raffle")}
                    divider={isSignedIn}
                >
                    Raffle
                </MenuItem>

                {isSignedIn && (
                    <MenuItem
                        onClick={() => {
                            firebase.auth().signOut()
                            setMenuOpen(false)
                        }}
                    >
                        Sign Out
                    </MenuItem>
                )}
            </Menu>
        </>
    )
}

export default HeaderProfileMenu
