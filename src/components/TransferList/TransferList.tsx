import React from "react"
import { Grid, Hidden, Button, makeStyles } from "@material-ui/core"

import ListCard from "./ListCard"
import { SubmitButton, SubmitFunction } from "components/Buttons"
import {
    KeyboardArrowUpRounded,
    KeyboardArrowDownRounded,
    KeyboardArrowLeftRounded,
    KeyboardArrowRightRounded,
} from "@material-ui/icons"

const useStyles = makeStyles(theme => ({
    root: {
        margin: "auto",
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
    grow: {
        flexGrow: 1,
    },
}))

type Props<T> = {
    initialLeft: T[]
    initialRight: T[]
    titleLeft: string
    titleRight: string
    getID: (item: T) => string
    handleConfirm?: (
        left: T[],
        right: T[]
    ) => SubmitFunction<{ message: string }>
    icon?: React.ReactNode
}

type ListFunc<T> = (a: T[], b: T[]) => T[]

const TransferList = <T,>({
    initialLeft,
    initialRight,
    titleLeft,
    titleRight,
    getID,
    handleConfirm,
    icon,
}: Props<T>) => {
    const classes = useStyles()

    // Potentially memo-ize these functions but might not be necessary since lightweight
    const findItem = (item: T, list: T[]) =>
        list.findIndex(i => getID(i) === getID(item))
    const not: ListFunc<T> = (a, b) =>
        a.filter(item => findItem(item, b) === -1)
    const intersection: ListFunc<T> = (a, b) =>
        a.filter(item => findItem(item, b) !== -1)
    const union: ListFunc<T> = (a, b) => [...a, ...not(b, a)]

    const [left, setLeft] = React.useState(initialLeft)
    const [right, setRight] = React.useState(initialRight)

    const [checked, setChecked] = React.useState<T[]>([])
    const leftChecked = intersection(checked, left)
    const rightChecked = intersection(checked, right)

    const handleToggle = (item: T) => () => {
        const currentIndex = findItem(item, checked)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(item)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
    }

    const numberOfChecked = (list: T[]) => intersection(checked, list).length

    const handleToggleAll = (list: T[]) => () => {
        if (numberOfChecked(list) === list.length) {
            setChecked(not(checked, list))
        } else {
            setChecked(union(checked, list))
        }
    }

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked))
        setRight(not(right, rightChecked))
        setChecked(not(checked, rightChecked))
    }

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked))
        setLeft(not(left, leftChecked))
        setChecked(not(checked, leftChecked))
    }

    const isItemChecked = (item: T) => findItem(item, checked) !== -1

    // This is inefficient but small datasets so uh... eh whatever
    const hasChanges =
        intersection(left, initialLeft).length !== initialLeft.length ||
        intersection(right, initialRight).length !== initialRight.length

    return (
        <Grid
            container
            className={classes.root}
            spacing={2}
            justify="center"
            alignItems="stretch"
        >
            <Grid item xs={12} md={5}>
                <ListCard
                    title={titleLeft}
                    list={left}
                    className={classes.grow}
                    getID={getID}
                    handleToggle={handleToggle}
                    handleToggleAll={handleToggleAll(left)}
                    numberOfChecked={numberOfChecked(left)}
                    isItemChecked={isItemChecked}
                    icon={icon}
                />
            </Grid>
            <Grid item xs={1} container direction="column" justify="center">
                <Hidden mdUp>
                    <Button
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        <KeyboardArrowUpRounded />
                    </Button>
                    <Button
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        <KeyboardArrowDownRounded />
                    </Button>
                </Hidden>
                <Hidden smDown>
                    <Button
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        <KeyboardArrowRightRounded />
                    </Button>
                    <Button
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        <KeyboardArrowLeftRounded />
                    </Button>
                </Hidden>
            </Grid>
            <Grid item xs={12} md={5}>
                <ListCard
                    title={titleRight}
                    list={right}
                    className={classes.grow}
                    getID={getID}
                    handleToggle={handleToggle}
                    handleToggleAll={handleToggleAll(right)}
                    numberOfChecked={numberOfChecked(right)}
                    isItemChecked={isItemChecked}
                    icon={icon}
                />
            </Grid>
            {handleConfirm && (
                <Grid item xs={12}>
                    <SubmitButton
                        initialText="Confirm Changes"
                        handleClick={handleConfirm(left, right)}
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={!hasChanges}
                    />
                </Grid>
            )}
        </Grid>
    )
}

export default TransferList
