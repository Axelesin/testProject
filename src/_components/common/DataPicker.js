import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default function DatePickers(props) {
    const classes = useStyles();
    const {value, onChange, name} = props;

    return (
        <form className={classes.container} noValidate>
            <TextField
                onChange={onChange}
                name={name}
                value={value}
                id="date"
                label="Birthday"
                type="date"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </form>
    );
}