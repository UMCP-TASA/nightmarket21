import React from "react"
import { graphql } from "gatsby"
import {
    Button,
    Card,
    Typography,
    TextField,
    makeStyles,
    Grid,
    MenuItem,
} from "@material-ui/core"
import { StripeItemFragment } from "graphql-types"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"
import Image from "components/Image"

const useStyles = makeStyles(theme => ({
    content: {
        padding: theme.spacing(2),
    },
}))

type Item = Omit<StripeItemFragment, "product"> & StripeItemFragment["product"]

const findItem = (items: Item[], id: string) =>
    items.find(item => item.id === id)

type Props = {
    title: string
    data: StripeItemFragment[]
    children?: React.ReactNode
}

/**
 * Assumes that everything being passed in is from the first product
 * Takes the info from the first item
 * @param param0
 */
const StripeItemCard = ({ title, data, children }: Props) => {
    const classes = useStyles()
    const { addItem } = useShoppingCart()
    const [selectedId, setSelectedId] = React.useState(data[0] && data[0].id)
    const [quantity, setQuantity] = React.useState(1)

    if (data.length < 1) {
        console.warn("No products provided")
        return <></>
    }

    const localFiles = data[0].product?.localFiles
    const items: Item[] = data.map(({ product, ...rest }) => ({
        ...rest,
        ...product,
    }))

    const foundItem = findItem(items, selectedId)
    const totalPrice = formatCurrencyString({
        value: (foundItem?.unit_amount as number) * quantity,
        currency: foundItem?.currency as string,
    })

    const handleClick = () => {
        if (!foundItem) return
        addItem({
            name: foundItem?.name as string,
            description: foundItem?.description as string,
            sku: foundItem.id,
            price: foundItem?.unit_amount as number,
            currency: foundItem?.currency as string,
            image:
                foundItem?.images && foundItem?.images[0]
                    ? foundItem?.images[0]
                    : "",
        }, quantity)
    }

    return (
        <Card>
            <Grid container alignItems="stretch" justify="space-between">
                <Grid item xs={12} md={5}>
                    {localFiles && localFiles[0] && (
                        <Image image={localFiles[0]} />
                    )}
                </Grid>
                <Grid
                    item
                    className={classes.content}
                    xs={12}
                    md={7}
                    container
                    alignItems="stretch"
                    alignContent="stretch"
                    justify="center"
                    spacing={1}
                >
                    <Grid item xs={12}>
                        <Typography variant="h5" align="center">
                            {title}
                        </Typography>
                    </Grid>

                    {children && (
                        <Grid item xs={12}>
                            {children}
                        </Grid>
                    )}

                    <Grid item xs={9}>
                        <TextField
                            id={`choose-item-${title}-select`}
                            select
                            onChange={event =>
                                setSelectedId(event.target.value as string)
                            }
                            value={selectedId}
                            label="Bundles"
                            helperText="Select a bundle"
                            variant="outlined"
                            fullWidth
                        >
                            {items.map(item => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            id={`choose-quantity-${title}-select`}
                            onChange={event =>
                                setQuantity(Number(event.target.value))
                            }
                            type="number"
                            label="Qty"
                            variant="outlined"
                            value={quantity}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            color="primary"
                            onClick={handleClick}
                        >
                            {`Add to Cart | ${totalPrice}`}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    )
}

export default StripeItemCard

export const query = graphql`
    fragment StripeItem on StripePrice {
        id
        product {
            description
            name
            images
            localFiles {
                ...Image
            }
        }
        unit_amount
        currency
    }
`
