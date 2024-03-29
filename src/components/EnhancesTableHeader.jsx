import {useTableState} from "../hooks/use-table-state.hook";
import {useSetTableState} from "../hooks/use-set-table-state.hook";
import React, {useCallback} from "react";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import ColumnsFilter from "./ColumnsFilter";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";
import {lighten, makeStyles} from "@material-ui/core/styles";

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

export const EnhancedTableToolbar = () => {
    const classes = useToolbarStyles();
    const {
        selectedHorses
    } = useTableState()
    const setState = useSetTableState();
    const onDelete = useCallback(() => {
        setState(p => ({
            ...p,
            data: p.data.filter(item => !selectedHorses.includes(item.id)),
            selectedHorses: []
        }))
    }, [setState, selectedHorses])
    const numSelected = selectedHorses.length;
    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    Race Card
                </Typography>
            )}
            <ColumnsFilter
            />
            {numSelected > 0 && (
                <Tooltip title="Delete">
                    <IconButton
                        onClick={onDelete}
                        aria-label="delete">
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};


EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};
