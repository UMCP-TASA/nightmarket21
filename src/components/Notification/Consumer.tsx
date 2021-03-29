import React from "react"
import { NotificationContext, NotificationContextType } from "./Provider"

type Props = {
    children: (context: NotificationContextType) => React.ReactNode
}

const Consumer = ({ children }: Props) => (
    <NotificationContext.Consumer>{children}</NotificationContext.Consumer>
)

export default Consumer
