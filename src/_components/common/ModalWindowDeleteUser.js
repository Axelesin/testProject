import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {ContainedButton} from "./index";
import {userActions} from "../../_actions";
import {connect} from "react-redux";
import {history} from "../../_helpers";

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
    }
}));

function ModalWindowDeleteUser(props) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const {openStatus, closePopup, deleteUser, user} = props;

    const deleteAcc = () => {
        deleteUser(user.id);
        history.push('/login');
    };


    return (
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={openStatus}
            onClose={closePopup}
        >
            <div style={modalStyle} className={classes.paper}>
                <h2 id="simple-modal-title">Are you sure you want to delete your account?</h2>
                <div className={classes.buttonContainer}>
                    <ContainedButton
                        disabled={false}
                        onClick={deleteAcc}
                        title={'DELETE ACCOUNT'}
                        color={'secondary'}
                    />
                    <ContainedButton
                        disabled={false}
                        onClick={closePopup}
                        title={'cancel'}
                    />
                </div>
            </div>
        </Modal>
    );
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

const connectedModalWindowDeleteUser = connect(mapState, actionCreators)(ModalWindowDeleteUser);
export {connectedModalWindowDeleteUser as ModalWindowDeleteUser};