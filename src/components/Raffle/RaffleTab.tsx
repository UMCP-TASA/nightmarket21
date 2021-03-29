import React from "react"

type Props = {
    children: React.ReactNode
    className?: string
    index: number
    value: number
}

const RaffleTab = ({ children, className, index, value }: Props) => (
    <div
        role="tabpanel"
        className={className}
        hidden={value !== index}
        id={`raffle-tab-panel-${index}`}
        aria-labelledby={`raffle-tab-${index}`}
    >
        {children}
    </div>
)

export default RaffleTab
