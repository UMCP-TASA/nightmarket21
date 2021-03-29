import React from "react"
import { Snackbar, SnackbarProps } from "@material-ui/core"
import { Alert, AlertProps } from "@material-ui/lab"

export interface NotificationProps {
    open: boolean
    handleClose: () => void
    message: string
    duration?: number
    severity: AlertProps["severity"]
    snackbarProps?: SnackbarProps
    alertProps?: Omit<AlertProps, "severity">
}

const Notification = ({
    open,
    handleClose,
    duration = 6000,
    message,
    severity,
    snackbarProps,
    alertProps,
}: NotificationProps) => (
    <Snackbar
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={duration}
        onClose={handleClose}
        {...snackbarProps}
    >
        <Alert severity={severity} onClose={handleClose} {...alertProps}>
            {message}
        </Alert>
    </Snackbar>
)

export default Notification
