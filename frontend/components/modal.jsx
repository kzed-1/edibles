import React from 'react';
import {closeModal, doNothing} from '../actions/modal_action';
import { connect } from 'react-redux';
import RecipeCreateFormContainer from '../components/recipes/recipe_create_form container';
import {Route} from 'react-router-dom';
import UpdateErrorContainer from '../components/modal_errors/update_error_container';
import ConfirmDeleteContainer from '../components/modal_errors/confirm_delete_modal';



// class Modal extends React.Component {

//     render () {
//         return (
//             <div>

//             </div>
//         )
//     }
// }

function Modal({modal, closeModal}) {

    if(!modal) {
        return null;
    } 

    let stepId, modalString;

    if (modal.includes("deleteStep")) {
        debugger
        stepId = parseInt(modal.split("-")[1]);
        modalString = modal.split("-")[0]
    }

    debugger

    let component, modalAction;

    debugger
    switch (modal) {
        case 'open':
            component = <RecipeCreateFormContainer />
            modalAction = doNothing
            break;
        case "update":
            component = <UpdateErrorContainer />
            modalAction = closeModal
            break;
        case (modal):
            debugger

            component = <ConfirmDeleteContainer stepId={stepId}/>
            modalAction =closeModal
            break;
        default:
            return null;
    }

    return (
        <div className="modal-background" onClick={()=> modalAction()}>
            <div className={`modal-child-${modal}`} onClick={e => e.stopPropagation()}>
                {component}
            </div>
        </div>
    );

   

};

const msp = (state) => {

    return {
        modal: state.ui.modal,
        doNothing: () => doNothing()
    }
}
const mdp = dispatch => {
    return {
        closeModal: () => dispatch(closeModal()),
        openModal: (modal) => dispatch(closeModal(modal)),
    };
};


export default connect(msp, mdp)(Modal);