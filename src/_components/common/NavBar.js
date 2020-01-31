import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Link} from "react-router-dom";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `wrapped-tab-${index}`,
        'aria-controls': `wrapped-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {

        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function NavBar(props) {
    const classes = useStyles();
    const {selected, setSelected} = props;
    let initialState = () => {
        switch (selected) {
            case '/':
                return 'HOME';
            case '/user-profile-page':
                return 'USER_PAGE';
            default:
                return 'HOME'
        }
    };

    const handleChange = (event, newValue) => {
        newValue !== initialState() && setSelected()
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={initialState()} onChange={handleChange} aria-label="wrapped label tabs example">
                    <Tab
                        value="HOME"
                        label="HOME"
                        wrapped
                        {...a11yProps('one')}
                    />
                    <Tab value="USER_PAGE" label="USER PAGE" {...a11yProps('two')} />
                </Tabs>
            </AppBar>
        </div>
    );
}