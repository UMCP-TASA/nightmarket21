import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
    makeStyles,
    DialogActions,
    Button,
} from "@material-ui/core"
import Confetti from "react-confetti"
import Sparkle from "components/Sparkle"

import { DocType } from "."

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))

type Props = {
    winningTickets: DocType[]
}

const RaffleWinner = ({ winningTickets }: Props) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [currentTicket, setCurrentTicket] = useState<DocType>()

    useEffect(() => {
        if (open) return

        for (let i = 0; i < winningTickets.length; i++) {
            if (!winningTickets[i].get("seen")) {
                setOpen(true)
                setCurrentTicket(winningTickets[i])
            }
        }
    }, [winningTickets, open])

    if (!currentTicket) return null

    const dialogLabelId = "confirm-raffle-ticket-winner-title"
    const id = currentTicket.id
    const { category, prize } = currentTicket.data()

    const handleClick = async () => {
        await currentTicket.ref.update({
            seen: true,
        })
        setOpen(false)
    }

    return (
        <>
            <Confetti numberOfPieces={400} recycle={open} opacity={0.8} />
            <Dialog
                open={open}
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="md"
                PaperProps={{
                    className: classes.root,
                }}
                aria-labelledby={dialogLabelId}
            >
                <DialogTitle id={dialogLabelId} disableTypography>
                    <Typography variant="h4" align="center">
                        <Sparkle>Congratulations</Sparkle> your {category}{" "}
                        ticket has won!
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography align="center">
                        <b>Ticket #:</b> {id}
                    </Typography>
                    <Typography align="center" paragraph>
                        <b>Prize: </b>
                        {prize}
                    </Typography>
                    <Typography align="center">
                        We will contact you soon to claim your prize! Please
                        confirm you've seen this message
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={handleClick}
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default RaffleWinner
