import React from "react"
import {
    Button,
    ButtonGroup,
    Grid,
    Typography,
    makeStyles,
} from "@material-ui/core"
import { AddRounded, RemoveRounded, ClearRounded } from "@material-ui/icons"
import {
    useShoppingCart,
    CartEntry,
    formatCurrencyString,
} from "use-shopping-cart"
import { AnimatedIconButton } from "components/Buttons"

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    image: {
        width: "100px",
        height: "100px",
        marginRight: theme.spacing(1),
    },
}))

type Props = {
    item: CartEntry
}

const CartItem = ({ item }: Props) => {
    const classes = useStyles()
    const { decrementItem, incrementItem, removeItem } = useShoppingCart()

    return (
        <Grid
            container
            className={classes.root}
            justify="space-between"
            alignItems="stretch"
            spacing={1}
        >
            <Grid item xs={3}>
                <img
                    className={classes.image}
                    src={item.image}
                    alt={`${item.image} product image`}
                />
            </Grid>

            <Grid
                item
                xs={5}
                container
                direction="column"
                justify="space-between"
            >
                <Grid item>
                    <Typography variant="subtitle1">{item.name}</Typography>
                </Grid>

                <Grid item>
                    <ButtonGroup
                        color="secondary"
                        aria-label="set-product-quantity"
                    >
                        <Button onClick={() => decrementItem(item.sku)}>
                            <RemoveRounded />
                        </Button>

                        <Button disableRipple>{item.quantity}</Button>

                        <Button onClick={() => incrementItem(item.sku)}>
                            <AddRounded />
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>

            <Grid
                item
                xs={2}
                container
                justify="space-between"
                alignItems="flex-end"
                direction="column"
            >
                <Grid item>
                    <AnimatedIconButton
                        size="small"
                        onClick={() => removeItem(item.sku)}
                        from="rotate(0deg)"
                        to="rotate(90deg)"
                    >
                        <ClearRounded />
                    </AnimatedIconButton>
                </Grid>

                <Grid item>
                    <Typography variant="subtitle1" align="right">
                        {formatCurrencyString({
                            value: item.value,
                            currency: "USD",
                        })}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CartItem
