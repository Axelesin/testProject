import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Main from './Main'
import {CircularIndeterminate, MiniDrawer} from '../_components/common'
import {userActions} from '../_actions';
import {history} from "../_helpers";


class UserProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            photo: '',
            phoneNumber: '',
            address: '',
            email: '',
            dateOfBirth: '',
            securityQuestions: {
                1: {
                    id: '',
                    answer: '',
                },
                2: {
                    id: '',
                    answer: '',
                },
                3: {
                    id: '',
                    answer: '',
                },
                hasError: false,
            }
        };

        this.state = {
            selectedLeftTab: 'Basic info',
            submitted: false,
            activeUser: this.props.activeUser ? this.props.activeUser : this.initialState
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onClickLeftMenu = this.onClickLeftMenu.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('@@@@@ this.props', this.props);
    }


    componentDidMount() {
        this.props.getUserById(this.props.user.id);
    }

    handleSubmit(data) {
        this.setState({submitted: true});
        const {
                  firstName,
                  lastName,
                  username,
                  password,
                  photo,
                  phoneNumber,
                  address,
                  email,
                  dateOfBirth,
                  securityQuestions
              } = data;


        if (firstName &&
            lastName &&
            username &&
            password &&
            photo &&
            phoneNumber &&
            address &&
            email &&
            dateOfBirth &&
            securityQuestions.hasError
        ) {
            let newData = data;
            newData.id = this.props.user.id;
            this.props.update(newData);
        }
    }

    onClickLeftMenu(e) {
        this.setState({
            ...this.state,
            selectedLeftTab: e.currentTarget.dataset.name,
        })
    }

    render() {
        const {user, activeUser, location} = this.props;

        return (
            <div className={'mainContainer'}>
                <header>
                    <MiniDrawer
                        selected={location.pathname}
                        setSelected={() => {
                            user &&
                            history.push('/');
                        }}
                        selectedLeftTab={this.state.selectedLeftTab}
                        onClickLeftMenu={this.onClickLeftMenu}

                    >
                        <main>
                            <div className={'main'}>
                                {
                                    activeUser ?
                                        <Main
                                            handleSubmit={this.handleSubmit}
                                            submitted={this.state.submitted}
                                            selectedLeftTab={this.state.selectedLeftTab}
                                            addPhoto={this.addPhoto}
                                            addSecurityQuestion={this.addSecurityQuestion}
                                            activeUser={this.props.activeUser}
                                        />
                                        : <CircularIndeterminate/>
                                }
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
    const {user, activeUser, loadingUpdate} = authentication;
    return {user, activeUser, users, loadingUpdate};
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete,
    getUserById: userActions.getUserById,
    update: userActions.update,
};

const connectedUserProfilePage = connect(mapState, actionCreators)(UserProfilePage);
export {connectedUserProfilePage as UserProfilePage};