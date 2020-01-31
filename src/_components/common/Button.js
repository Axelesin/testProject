import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function ContainedButton(props) {
    const classes = useStyles();
    const {onClick, title, disabled, color='primary'} = props

    return (
        <div className={classes.root}>
            <Button variant="contained" color={color} onClick={onClick} disabled={disabled}>
                {title}
            </Button>
        </div>
    );
}