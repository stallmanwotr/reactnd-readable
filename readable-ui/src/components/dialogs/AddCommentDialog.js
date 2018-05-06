import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';
import { addComment, editComment } from '../../actions/actions';
import './ModalDialog.css';

/**
 * (Dialog Box)
 * Add a new comment, or edit an existing comment.
 */
class AddCommentDialog extends Component {

    static propTypes = {
        /** The parent post for this comment. */
        postId: PropTypes.string.isRequired,

        /** The user comment to be shown. */
        isModalOpen: PropTypes.bool.isRequired,

        /** Handler: The user closes the modal (via add or close button). */
        onCloseModal: PropTypes.func,

        /** If set then the existing comment to be edited. */
        commentToEdit: PropTypes.object
    }

    state = {
        textAreaValue: ''
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }

    _onAddOrEditButton() {
        const { commentToEdit } = this.props;
        const isEditMode = (typeof commentToEdit === 'object');
        if (isEditMode) {
            this._onEditButton();
        }
        else {
            this._onAddButton();
        }
    }

    _onAddButton() {
        const { postId, dispatch } = this.props;
        const author = this.inputAuthor.value;;
        const body = this.state.textAreaValue;

        const commentInfo = {
            id: uuidv1(),
            timestamp: new Date().getTime(),
            parentId: postId,
            author,
            body
        };

        console.info('Add comment: ' + JSON.stringify(commentInfo));
        dispatch(addComment(commentInfo));
    }

    _onEditButton() {
        const { commentToEdit, dispatch } = this.props;
        const timestamp = new Date().getTime();
        const body = this.state.textAreaValue;
        
        console.info('Edit comment: ' + commentToEdit.id);
        dispatch(editComment(commentToEdit.id, timestamp, body));
    }

    _handleTextAreaChange(event) {
        this.setState({textAreaValue: event.target.value});
    }

    render() {
        const { isModalOpen, onCloseModal, commentToEdit } = this.props;
        const isEditMode = (typeof commentToEdit === 'object');

        return (
            <Modal
                className="rd-modal-content"
                overlayClassName="rd-modal-overlay"
                isOpen={isModalOpen}
                onRequestClose={this._closeModal}
                contentLabel="Modal"
            >
                <div className="rd-modal-body">
                    <div className="rd-modal-header">
                        {(commentToEdit) ? 'Edit Comment' : 'Add a Comment'}
                    </div>

                    <div className="rd-modal-subheader">Author</div>
                    <div className="rd-add-comment-author">
                        <input
                            type="text"
                            className="rd-modal-input"
                            placeholder="Author"
                            defaultValue={(isEditMode) ? commentToEdit.author : undefined}
                            disabled={isEditMode}
                            ref={(input) => this.inputAuthor = input} />
                    </div>

                    <div className="rd-modal-subheader">Body</div>
                    <div className="rd-add-comment-body">
                        <textarea
                            className="rd-modal-input rd-modal-textarea"
                            placeholder="Comment Content"
                            defaultValue={(isEditMode) ? commentToEdit.body : undefined}
                            value={this.state.value}
                            onChange={this._handleTextAreaChange.bind(this)} />
                    </div>

                    <div className="rd-modal-buttons">
                        <div className="rd-modal-button"
                            onClick={() => { if (onCloseModal) { onCloseModal(); }}} >
                            Cancel
                        </div>
                        <div className="rd-modal-button rd-modal-button-add"
                            onClick={() => {
                                this._onAddOrEditButton();
                                if (onCloseModal) { onCloseModal(); }
                            }} >
                            {(isEditMode) ? 'Submit Changes' : 'Add'}
                        </div>
                    </div>
                </div>
            </Modal>
        );
    };
}

export default connect()(AddCommentDialog);
