import React from 'react';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import {history} from '../_helpers';
import {alertActions} from '../_actions';
import {PrivateRoute} from '../_components';
import {HomePage} from '../HomePage';
import {LoginPage} from '../LoginPage';
import {RegisterPage} from '../RegisterPage';
import {UserProfilePage} from '../UserProfilePage'
import { createMuiTheme } from "@material-ui/core";


const theme = createMuiTheme({
    spacing: 6,
});


class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }

    render() {
        const {alert} = this.props;
        return (
            <ThemeProvider theme={theme}>
                <div>
                    {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <Router history={history}>
                        <Switch>
                            <PrivateRoute exact path="/" component={HomePage}/>
                            <Route path="/login" component={LoginPage}/>
                            <Route path="/register" component={RegisterPage}/>
                            <Route path="/user-profile-page" component={UserProfilePage}/>
                            <Redirect from="*" to="/"/>
                        </Switch>
                    </Router>
                </div>
            </ThemeProvider>
        );
    }
}

function mapState(state) {
    const {alert} = state;
    return {alert};
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export {connectedApp as App};