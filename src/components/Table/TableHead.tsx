import React from "react"
import {
    TableHead,
    TableRow,
    TableCell,
    TableCellProps,
    TableSortLabel,
    Checkbox,
    makeStyles,
} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    title: {
        marginLeft: theme.spacing(3),
    },
    cell: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingLeft: 0,
        paddingRight: 0,
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1,
    },
}))

export type HeadCell = {
    id: string
    label: string
    disablePadding?: boolean
    align?: TableCellProps["align"]
}

export type Order = "asc" | "desc"

type Props = {
    cells: HeadCell[]
    numSelected: number
    onRequestSort: (property: string) => void
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
    order: Order
    orderBy: string
    rowCount: number
}

export default function EnhancedTableHead({
    cells,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
}: Props) {
    const classes = useStyles()
    const createSortHandler = (property: string) => () => {
        onRequestSort(property)
    }

    return (
        <TableHead>
            <TableRow>
                {/* <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ "aria-label": "select all desserts" }}
                    />
                </TableCell> */}
                {cells.map(
                    ({
                        id,
                        label,
                        align = "center",
                        disablePadding = false,
                    }) => (
                        <TableCell
                            key={id}
                            className={classes.cell}
                            align={align}
                            padding={disablePadding ? "none" : "default"}
                            sortDirection={orderBy === id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === id}
                                className={classes.title}
                                direction={orderBy === id ? order : "asc"}
                                onClick={createSortHandler(id)}
                            >
                                {label}
                                {orderBy === id ? (
                                    <span className={classes.visuallyHidden}>
                                        {order === "desc"
                                            ? "sorted descending"
                                            : "sorted ascending"}
                                    </span>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    )
                )}
            </TableRow>
        </TableHead>
    )
}
