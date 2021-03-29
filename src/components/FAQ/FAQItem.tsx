import React from "react"
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from "@material-ui/core"
import { ExpandMore } from "@material-ui/icons"

type Props = {
    id: string
    question: string
    answer?: string
    children?: React.ReactNode
}

const FAQItem = ({ id, question, answer, children }: Props) => (
    <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls={`${id}-controls`}
            id={`${id}-header`}
        >
            <Typography variant="h6">{question}</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ textAlign: "left" }}>
            {answer && <Typography>{answer}</Typography>}
            {children}
        </AccordionDetails>
    </Accordion>
)

export default FAQItem
