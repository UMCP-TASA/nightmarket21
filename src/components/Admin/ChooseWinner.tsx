import React from "react"
import firebase from "gatsby-plugin-firebase"
import {
    Card,
    CardHeader,
    CardContent,
    Grid,
    TextField,
    MenuItem,
    makeStyles,
} from "@material-ui/core"

import { SubmitButton } from "components/Buttons"

const useStyles = makeStyles(theme => ({
    form: {},
}))

type Props = {}

const prizes = ["General", "Switch", "Airpods"]

const ChooseWinner = ({}: Props) => {
    const classes = useStyles()
    const [prize, setPrize] = React.useState("General")

    const handleClick = async () => {
        const chooseWinner = firebase
            .app()
            .functions("us-east4")
            .httpsCallable("chooseWinner")
        const response = await chooseWinner({
            prize,
        })

        return {
            message: response.data.message,
            ...response.data,
        }
    }

    const selectId = "choose-winner-prize-select"

    return (
        <Card>
            <CardHeader
                title="Choose Winner"
                titleTypographyProps={{ align: "center" }}
            />
            <CardContent>
                <Grid container justify="center" spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            id={selectId}
                            select
                            onChange={event =>
                                setPrize(event.target.value as string)
                            }
                            value={prize}
                            label="Prizes"
                            helperText="Select a prize"
                            variant="outlined"
                            fullWidth
                        >
                            {prizes.map(prize => (
                                <MenuItem key={prize} value={prize}>
                                    {prize}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <SubmitButton
                            initialText="Choose Winner"
                            handleClick={handleClick}
                            fullWidth
                            size="large"
                            color="primary"
                            variant="contained"
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default ChooseWinner
