import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import {IconButton} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import {FilterList} from "@material-ui/icons";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import {useTableState} from "../hooks/use-table-state.hook";
import {useSetTableState} from "../hooks/use-set-table-state.hook";

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
    switchRoot: {
        padding: theme.spacing(3),
    }
}));

export default function ColumnsFilter() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const {visibleColumns, fieldNames} = useTableState()
    const setTableState = useSetTableState();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Tooltip title={"Filter columns"}>
                <IconButton aria-describedby={id} variant="contained" onClick={handleClick}>
                    <FilterList/>
                </IconButton>
            </Tooltip>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div className={classes.switchRoot}>
                    <Typography>Pick columns to show</Typography>
                    {
                        fieldNames.map(field => {
                            return <div><FormControlLabel
                                label={field}
                                onChange={() => {
                                    setTableState(p => ({
                                        ...p,
                                        visibleColumns: {
                                            ...p.visibleColumns,
                                            [field]: !p.visibleColumns[field]
                                        }
                                    }))
                                }}
                                control={<Switch checked={visibleColumns[field]}/>}/>
                            </div>
                        })
                    }
                </div>
            </Popover>
        </div>
    );
}