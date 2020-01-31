import React from 'react';
import {connect} from 'react-redux';
import {MiniDrawer} from '../_components/common'
import {userActions} from '../_actions';
import {Link} from 'react-router-dom';
import {history} from "../_helpers";

class HomePage extends React.Component {
    componentDidMount() {
        // this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }


    render() {
        const {user, location} = this.props;

        // console.log('@@@@@ this.props', this.props);
        return (
            <div className={'mainContainer'}>
                <header>
                    <MiniDrawer
                        selected={location.pathname}
                        setSelected={() => {
                            user &&
                            history.push('/user-profile-page');
                        }}
                        hasLeftMenu={false}
                    >
                        <main>
                            <div className={'container'}>
                                <img
                                    src={'https://trkmedia.ollcdn.net/uploads/public/uploads/public/novosti/5c7d6c20df7d6_4k_wallpaper_astronomy_evening_1252873.jpeg'}
                                    width={'100%'}
                                    height={'auto'}
                                />
                                <p>
                                    text text
                                </p>
                            </div>
                        </main>
                    </MiniDrawer>
                </header>
                <footer className={'footer'}>
                    <Link to="/login">Logout</Link>
                </footer>
            </div>
        );
    }
}

function mapState(state) {
    const {users, authentication} = state;
    const {user} = authentication;
    return {user, users};
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete,
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export {connectedHomePage as HomePage};