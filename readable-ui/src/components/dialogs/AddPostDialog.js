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
        isModalOpen: PropTypes.bool.isRequired
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }

    _onCancelButton() {
    }

    _onAddButton() {
    }

    render() {
        const { isModalOpen } = this.props;

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
                            onClick={this._onCancelButton.bind(this)} >
                            Cancel
                        </div>
                        <div className="rd-modal-button"
                            onClick={this._onAddButton.bind(this)} >
                            Add
                        </div>
                    </div>
                </div>
            </Modal>
        );
    };
}

export default AddPostDialog;
