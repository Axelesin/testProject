import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {UserInputFields} from '../_components/common'
import {userActions} from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
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

            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addSecurityQuestion = this.addSecurityQuestion.bind(this);
        this.addPhoto = this.addPhoto.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;
        const {user} = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    addPhoto(data) {
        let newState = this.state;
        newState.user.photo = data;
        this.setState(newState);
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({submitted: true});
        const {user} = this.state;
        if (user.firstName &&
            user.lastName &&
            user.username &&
            user.password &&
            user.photo &&
            user.phoneNumber &&
            user.address &&
            user.email &&
            user.dateOfBirth &&
            user.securityQuestions.hasError
        ) {
            this.props.register(user);
        }
    }

    addSecurityQuestion(id, data) {
        const {user} = this.state;
        let newSecurityQuestions = user.securityQuestions;
        newSecurityQuestions[id] = data;
        newSecurityQuestions.hasError = newSecurityQuestions[1].id && newSecurityQuestions[2].id && newSecurityQuestions[3].id;
        this.setState({
            user: {
                ...user,
                securityQuestions: newSecurityQuestions,
            }
        });
    }

    render() {
        const {registering} = this.props;
        const {user, submitted} = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <UserInputFields
                        submitted={submitted}
                        user={user}
                        addPhoto={this.addPhoto}
                        handleChange={this.handleChange}
                        addSecurityQuestion={this.addSecurityQuestion}
                    />
                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>
                        {registering &&
                        <img
                            src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
                        }
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const {registering} = state.registration;
    return {registering};
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export {connectedRegisterPage as RegisterPage};