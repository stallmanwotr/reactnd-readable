import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Modal from 'react-modal';
import './AddPostDialog.css';

/**
 * (Dialog Box)
 * Allows a new post to be added.
 */
class AddPostDialog extends Component {

    static propTypes = {
        /** The user post to be shown. */
        isModalOpen: PropTypes.bool.isRequired,

        /** Handlers: When the user clicks a button. */
        onAddButton: PropTypes.func,
        onCancelButton: PropTypes.func
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }

    render() {
        const { isModalOpen, onAddButton, onCancelButton } = this.props;
        console.log('#### isModalOpen=' + isModalOpen);

        return (
            <Modal
                className="rd-modal-content"
                overlayClassName="rd-modal-overlay"
                isOpen={isModalOpen}
                onRequestClose={this.closeAddPostModal}
                contentLabel="Modal"
            >
                <div className="rd-modal-body">
                    <div className="rd-add-post-title">
                        Add a Post
                    </div>
                    <div className="rd-modal-buttons">
                        <div className="rd-modal-button"
                            onClick={() => { if (onCancelButton) { onCancelButton(); }}} >
                            Cancel
                        </div>
                        <div className="rd-modal-button rd-modal-button-add"
                            onClick={() => { if (onAddButton) { onAddButton(); }}} >
                            Add
                        </div>
                    </div>
                </div>
            </Modal>
        );
    };
}

export default AddPostDialog;
