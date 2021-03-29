import React from "react"
import { Notification, NotificationProps } from "."

type Options = Omit<NotificationProps, "open" | "handleClose">

export type NotificationContextType = {
    setNotification: (options: Options) => void
}

export const NotificationContext = React.createContext<NotificationContextType>(
    {
        setNotification: __ => {},
    }
)

type Props = {
    children: React.ReactNode
}

// Currently only one notification can be shown at a time so oops
const Provider = ({ children }: Props) => {
    const [open, setOpen] = React.useState(false)
    const [props, setProps] = React.useState<Options>({
        message: "",
        severity: "info",
    })

    const contextValue = React.useMemo(() => {
        function setNotification(options: Options) {
            setProps({
                ...options,
            })
            setOpen(true)
        }

        return {
            setNotification,
        }
    }, [setProps, setOpen])

    return (
        <NotificationContext.Provider value={contextValue}>
            {children}
            <Notification
                open={open}
                handleClose={() => setOpen(false)}
                {...props}
            />
        </NotificationContext.Provider>
    )
}

export default Provider
