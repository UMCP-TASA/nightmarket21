import React from "react"
import clsx from "clsx"
import {
    Toolbar,
    Typography,
    Tooltip,
    IconButton,
    lighten,
    makeStyles,
} from "@material-ui/core"
import { Delete, FilterList } from "@material-ui/icons"

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === "light"
            ? {
                  color: theme.palette.secondary.main,
                  backgroundColor: lighten(theme.palette.secondary.light, 0.85),
              }
            : {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.secondary.dark,
              },
    title: {
        flex: "1 1 100%",
    },
}))

type Props = {
    numSelected: number
    title: string
}

const EnhancedTableToolbar = ({ numSelected, title }: Props) => {
    const classes = useToolbarStyles()

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography
                    className={classes.title}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    className={classes.title}
                    variant="h5"
                    id="tableTitle"
                    align="center"
                    component="div"
                >
                    {title}
                </Typography>
            )}

            {/* {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <Delete />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton aria-label="filter list">
                        <FilterList />
                    </IconButton>
                </Tooltip>
            )} */}
        </Toolbar>
    )
}

export default EnhancedTableToolbar
