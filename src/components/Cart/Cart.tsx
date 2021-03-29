import React from "react"
import {
    Badge,
    Grid,
    Drawer,
    Divider,
    List,
    ListItem,
    IconButton,
    Typography,
    makeStyles,
} from "@material-ui/core"
import { ShoppingCartOutlined, ArrowForward } from "@material-ui/icons"
import { useShoppingCart } from "use-shopping-cart"
import { AnimatedIconButton } from "components/Buttons"
import { animated } from "react-spring"
import useBoop from "hooks/useBoop"

import Checkout from "./Checkout"
import CartItem from "./CartItem"

const useStyles = makeStyles(theme => ({
    grid: {
        padding: theme.spacing(2),
        paddingBottom: theme.spacing(6),
        height: "100%",
        width: "100%",
    },
    divider: {
        backgroundColor: theme.palette.primary.main,
        width: "100%",
        height: theme.spacing(2),
        borderWidth: "0px",
    },
    headerGrid: {
        display: "grid",
        gridTemplateColumns: "50px 1fr 50px",
    },
    headerIcon: {
        gridColumns: "1 / 2",
    },
    headerText: {
        gridColumns: "2 / 3",
        textAlign: "center",
        margin: "auto",
    },
}))

type Props = {
    className?: string
}

const AnimatedBoopButton = animated(IconButton)

const Cart = ({ className }: Props) => {
    const classes = useStyles()
    const { cartCount, cartDetails, formattedTotalPrice } = useShoppingCart()
    const [open, setOpen] = React.useState(false)
    const handleClose = () => setOpen(false)
    const [buttonBoop, trigger] = useBoop({ scale: 1.05 })

    React.useEffect(() => {
        if (cartCount > 0) {
            trigger()
        }
    }, [cartCount, trigger])

    return (
        <>
            <AnimatedBoopButton
                className={className}
                onClick={() => setOpen(true)}
                style={buttonBoop}
            >
                <Badge badgeContent={cartCount} color="primary">
                    <ShoppingCartOutlined />
                </Badge>
            </AnimatedBoopButton>

            <Drawer open={open} anchor="right" onClose={handleClose}>
                <Grid
                    className={classes.grid}
                    container
                    justify="space-between"
                    direction="column"
                    spacing={1}
                >
                    <Grid item container direction="column" spacing={1}>
                        <Grid item className={classes.headerGrid}>
                            <AnimatedIconButton
                                className={classes.headerIcon}
                                onClick={handleClose}
                                from="translate(0px)"
                                to="translate(10px"
                            >
                                <ArrowForward />
                            </AnimatedIconButton>

                            <Typography
                                variant="h6"
                                className={classes.headerText}
                            >
                                Cart
                            </Typography>
                        </Grid>

                        <Grid item>
                            <hr className={classes.divider} />
                        </Grid>

                        <Grid item>
                            {cartCount == 0 && (
                                <Typography variant="h6" align="center">
                                    Your Cart is Empty
                                </Typography>
                            )}
                            <List component="div">
                                {Object.entries(cartDetails).map(
                                    ([id, item]) => (
                                        <ListItem
                                            key={id}
                                            divider
                                            disableGutters
                                        >
                                            <CartItem item={item} />
                                        </ListItem>
                                    )
                                )}
                            </List>
                        </Grid>
                    </Grid>

                    {cartCount > 0 && (
                        <Grid
                            item
                            container
                            direction="column"
                            spacing={2}
                            alignItems="stretch"
                        >
                            <Grid item>
                                <Divider />
                            </Grid>
                            <Grid item container justify="space-between">
                                <Grid item>
                                    <Typography>
                                        <b>Subtotal</b>
                                    </Typography>
                                </Grid>

                                <Grid item>
                                    <Typography align="right">
                                        {formattedTotalPrice}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Checkout handleClose={handleClose} />
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Drawer>
        </>
    )
}

export default Cart
