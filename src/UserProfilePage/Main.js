import React from 'react';
import {ContainedButton, UserInputFields, ModalWindowDeleteUser} from '../_components/common'
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';


export default class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openPopup: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.addSecurityQuestion = this.addSecurityQuestion.bind(this);
        this.addPhoto = this.addPhoto.bind(this);
        this.postData = this.postData.bind(this);
        this.openPopup = this.openPopup.bind(this);
    }

    componentDidMount() {
        this.setState(this.props.activeUser)
    }

    handleChange(event) {
        const {name, value} = event.target;
        const newState = this.state;
        newState[name] = value;
        this.setState({
            ...newState
        });
    }

    addPhoto(data) {
        let newState = this.state;
        newState.photo = data;
        this.setState(newState);
    }

    addSecurityQuestion(id, data) {
        const user = this.state;
        let newSecurityQuestions = user.securityQuestions;
        newSecurityQuestions[id] = data;
        newSecurityQuestions.hasError = newSecurityQuestions[1].id && newSecurityQuestions[2].id && newSecurityQuestions[3].id;
        this.setState({
            ...user,
            securityQuestions: newSecurityQuestions,

        });
    }

    postData() {
        const newUsersData = this.state;
        this.setState({...newUsersData}, () => {
            this.props.handleSubmit(newUsersData);
        });
    }

    openPopup () {
        this.setState({openPopup : !this.state.openPopup})
    }

    render() {
        const {activeUser, selectedLeftTab, submitted,} = this.props;
        return (
            <div className={'smallContainer'}>
                {selectedLeftTab !== 'Delete' &&
                <div className={'imgContainer'}>
                    <img
                        src={selectedLeftTab === 'Basic info' ? activeUser.photo : this.state.photo}
                        width={'100%'}
                        height={'100%'}
                    />
                    {selectedLeftTab === 'Basic info' &&
                    <div/>
                    }
                </div>
                }
                {selectedLeftTab === 'Basic info' &&
                <div className={'mainInfoContainer'}>
                    <Typography variant="h3" gutterBottom>
                        {activeUser.firstName} {activeUser.lastName}
                    </Typography>
                    <Typography variant="h7" gutterBottom>
                        {activeUser.username}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        <PhoneIcon/>
                        {activeUser.phoneNumber}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        <HomeIcon/>
                        {activeUser.address}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        E-mail: {activeUser.email}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Date of birth: {activeUser.dateOfBirth}
                    </Typography>
                </div>
                }
                {selectedLeftTab === 'Setting' &&
                <div className={'editUserInfoContainer'}>
                    <UserInputFields
                        submitted={submitted}
                        user={{...this.state}}
                        addPhoto={this.addPhoto}
                        handleChange={this.handleChange}
                        addSecurityQuestion={this.addSecurityQuestion}
                    />
                    <ContainedButton
                        disabled={JSON.stringify(this.state) === JSON.stringify(activeUser)}
                        onClick={this.postData}
                        title={'save'}
                    />
                </div>
                }
                {selectedLeftTab === 'Delete' &&
                <>
                    <ContainedButton
                        color={'secondary'}
                        disabled={false}
                        onClick={this.openPopup}
                        title={'DELETE ACCOUNT'}
                    />
                    <ModalWindowDeleteUser
                        openStatus={this.state.openPopup}
                        closePopup={this.openPopup}
                    />
                </>
                }
            </div>
        );
    }
}

