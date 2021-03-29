import React from "react"
import { Tooltip, useTheme } from "@material-ui/core"
import { Star } from "@material-ui/icons"

const StarTooltip = () => {
    const theme = useTheme()
    return (
        <Tooltip title="Winning ticket!">
            <Star style={{ transform: "translate(0, 6px)" }} />
        </Tooltip>
    )
}

export default StarTooltip
