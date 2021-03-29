import React from "react"
import firebase from "gatsby-plugin-firebase"
import {
    Grid,
    TextField,
    makeStyles,
    Card,
    CardHeader,
    CardContent,
} from "@material-ui/core"

import { SubmitButton } from "components/Buttons"

type Props = {}

const GrantAdmin = ({}: Props) => {
    const [id, setId] = React.useState("")
    const handleClick = async () => {
        const grantAdmin = firebase
            .app()
            .functions("us-east4")
            .httpsCallable("grantAdmin")

        const response = await grantAdmin({ id })

        return {
            message: response.data.message,
            ...response.data,
        }
    }

    return (
        <Card>
            <CardHeader
                title="Grant Admin"
                titleTypographyProps={{ align: "center" }}
            />
            <CardContent>
                <Grid container justify="center" spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            id={"grant-admin-text"}
                            onChange={event => setId(event.target.value)}
                            label="UID"
                            helperText="Enter in user's UID"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SubmitButton
                            initialText="Grant Admin"
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

export default GrantAdmin
