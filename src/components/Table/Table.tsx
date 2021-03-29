import React from "react"
import {
    Paper,
    Tooltip,
    Table,
    TableBody,
    TableCell,
    TableCellProps,
    TableContainer,
    TablePagination,
    TablePaginationProps,
    TableRow,
    makeStyles,
} from "@material-ui/core"

import StarTooltip from "./StarTooltip"
import TableToolbar from "./TableToolbar"
import TableHeader, { HeadCell, Order } from "./TableHead"

function descendingComparator<T>(a: T, b: T, orderBy: string): number {
    //@ts-ignore Oops hard for me to check this
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    //@ts-ignore Oops hard for me to check this
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}

type Comparator<T> = (a: T, b: T) => number

function getComparator<T>(order: Order, orderBy: string): Comparator<T> {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(array: T[], comparator: Comparator<T>) {
    const stabilizedThis = array.map((el, index) => ({ el, index }))
    stabilizedThis.sort((a, b) => {
        const order = comparator(a.el, b.el)
        if (order !== 0) return order
        return a.index - b.index
    })
    return stabilizedThis.map(value => value.el)
}

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2),
    },
    cell: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingLeft: 0,
        paddingRight: 0,
    },
}))

interface Row {
    name: string
    align?: TableCellProps["align"]
    winner?: boolean
}

export type TableProps = {
    rowsPerPageOptions?: TablePaginationProps["rowsPerPageOptions"]
    initialRowsPerPage?: number
}

type Props<T> = TableProps & {
    rows: T[]
    headers: HeadCell[]
    title: string
}

export default function EnhancedTable<T extends Row>({
    rows,
    headers,
    title,
    rowsPerPageOptions = [5, 10, 25],
    initialRowsPerPage = 5,
}: Props<T>) {
    const classes = useStyles()
    const [order, setOrder] = React.useState<Order>("asc")
    const [orderBy, setOrderBy] = React.useState("calories")
    const [selected, setSelected] = React.useState<string[]>([])
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage)

    React.useEffect(() => setRowsPerPage(initialRowsPerPage), [
        initialRowsPerPage,
    ])

    const handleRequestSort = (property: string) => {
        const isAsc = orderBy === property && order === "asc"
        setOrder(isAsc ? "desc" : "asc")
        setOrderBy(property)
    }

    const handleSelectAllClick = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.checked) {
            const newSelecteds = rows.map(n => n.name)
            setSelected(newSelecteds)
            return
        }
        setSelected([])
    }

    const handleClick = (name: string) => {
        const selectedIndex = selected.indexOf(name)
        let newSelected: string[] = []

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1))
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            )
        }

        setSelected(newSelected)
    }

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const isSelected = (name: string) => selected.indexOf(name) !== -1

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableToolbar numSelected={selected.length} title={title} />
                <TableContainer>
                    <Table
                        aria-labelledby="tableTitle"
                        size={"medium"}
                        aria-label="enhanced table"
                    >
                        <TableHeader
                            cells={headers}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map(
                                    (
                                        {
                                            align = "center",
                                            name,
                                            winner = false,
                                            ...row
                                        },
                                        index
                                    ) => {
                                        const isItemSelected = isSelected(name)
                                        const labelId = `enhanced-table-checkbox-${index}`

                                        return (
                                            <TableRow
                                                hover
                                                // onClick={() =>
                                                //     handleClick(name)
                                                // }
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={name}
                                                selected={isItemSelected}
                                            >
                                                {/* <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            "aria-labelledby": labelId,
                                                        }}
                                                    />
                                                </TableCell> */}
                                                <TableCell
                                                    className={classes.cell}
                                                    id={labelId}
                                                    align={align}
                                                >
                                                    {winner ? (
                                                        <StarTooltip />
                                                    ) : null}
                                                    {name}
                                                </TableCell>
                                                {Object.entries(row).map(
                                                    ([key, value]) => (
                                                        <TableCell
                                                            className={
                                                                classes.cell
                                                            }
                                                            key={`${name}-${key}`}
                                                            align={align}
                                                        >
                                                            {/* @ts-ignore Value won't be available*/}
                                                            {value}
                                                        </TableCell>
                                                    )
                                                )}
                                            </TableRow>
                                        )
                                    }
                                )}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={rowsPerPageOptions}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    )
}
