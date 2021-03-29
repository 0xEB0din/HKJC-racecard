import React, {useCallback, useMemo} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import {useSetTableState} from "../hooks/use-set-table-state.hook";
import {useTableState} from "../hooks/use-table-state.hook";
import {EnhancedTableToolbar} from "./EnhancesTableHeader";
import {EnhancedTableHead} from "./TableHead";


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function EnhancedTable() {
    const classes = useStyles();
    const {data: rows, selectedHorses: selected} = useTableState();
    const setTableState = useSetTableState();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
    const [page] = React.useState(0);
    const [dense] = React.useState(false);
    const [rowsPerPage] = React.useState(5);
    const {visibleColumns} = useTableState();

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id);
            setTableState(p => ({
                ...p,
                selectedHorses: newSelecteds
            }));
            return;
        }
        setSelected([]);
    };
    const setSelected = useCallback(next => {
        setTableState(p => ({
            ...p,
            selectedHorses: next
        }))
    })
    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };


    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    const tableData = useMemo(() => {
        return stableSort(rows, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    }, [rows, orderBy, order, page, rowsPerPage])

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar/>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            visibleColumns={visibleColumns}
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {tableData
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{'aria-labelledby': labelId}}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" align="center">
                                                {row.id}
                                            </TableCell>
                                            {visibleColumns.horse && <TableCell align="center">{row.horse}</TableCell>}
                                            {visibleColumns.lastSix &&
                                            <TableCell align="center">{row.lastSix}</TableCell>}
                                            {visibleColumns.jockey &&
                                            <TableCell align="center">{row.jockey}</TableCell>}
                                            {visibleColumns.color &&
                                            <TableCell align="center"><img src={"./images/" + row.color + ".gif"}
                                                                           alt=""/></TableCell>}
                                            {visibleColumns.weight &&
                                            <TableCell align="center">{row.weight}</TableCell>}
                                            {visibleColumns.gear && <TableCell align="center">{row.gear}</TableCell>}
                                            {visibleColumns.rating &&
                                            <TableCell align="center">{row.rating}</TableCell>}
                                            {visibleColumns.draw && <TableCell align="center">{row.draw}</TableCell>}
                                            {visibleColumns.trainer &&
                                            <TableCell align="center">{row.trainer}</TableCell>}
                                            {visibleColumns.priority &&
                                            <TableCell align="center">{row.priority}</TableCell>}
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: (dense ? 33 : 53) * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}
