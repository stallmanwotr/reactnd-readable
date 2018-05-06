import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';
import { addPost, editPost } from '../../actions/actions';
import './AddPostDialog.css';

/**
 * (Dialog Box)
 * Add a new user post, or edit an existing post.
 */
class AddPostDialog extends Component {

    static propTypes = {
        category: PropTypes.string.isRequired,

        /** The user post to be shown. */
        isModalOpen: PropTypes.bool.isRequired,

        /** Handlers: When the user clicks a button. */
        onAddButton: PropTypes.func,
        onCancelButton: PropTypes.func,

        /** If set then the existing pos to be edited. */
        postToEdit: PropTypes.object
    }

    state = {
        textAreaValue: ''
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }

    _onAddOrEditButton() {
        const { postToEdit } = this.props;
        const isEditMode = (typeof postToEdit === 'object');
        if (isEditMode) {
            this._onEditButton();
        }
        else {
            this._onAddButton();
        }
    }

    _onAddButton() {
        const { category, dispatch } = this.props;
        const author = this.inputAuthor.value;;
        const title = this.inputTitle.value;
        const body = this.state.textAreaValue;

        const postInfo = {
            id: uuidv1(),
            timestamp: new Date().getTime(),
            title,
            body,
            author,
            category
        };

        console.info('Add post: ' + JSON.stringify(postInfo));
        dispatch(addPost(postInfo));
    }

    _onEditButton() {
        const { postToEdit, dispatch } = this.props;
        const title = this.inputTitle.value;
        const body = this.state.textAreaValue;
        
        console.info('Edit post: ' + postToEdit.id);
        dispatch(editPost(postToEdit.id, title, body));
    }

    _handleTextAreaChange(event) {
        this.setState({textAreaValue: event.target.value});
    }

    render() {
        const { isModalOpen, onAddButton, onCancelButton } = this.props;
        const { postToEdit } = this.props;
        const isEditMode = (typeof postToEdit === 'object');

        return (
            <Modal
                className="rd-modal-content"
                overlayClassName="rd-modal-overlay"
                isOpen={isModalOpen}
                onRequestClose={this.closeAddPostModal}
                contentLabel="Modal"
            >
                <div className="rd-modal-body">
                    <div className="rd-add-post-header">
                        {(postToEdit) ? 'Edit Post' : 'Add a Post'}
                    </div>

                    <div className="rd-add-post-subheader">Author</div>
                    <div className="rd-add-post-author">
                        <input
                            type="text"
                            className="rd-add-post-input"
                            placeholder="Author"
                            defaultValue={(isEditMode) ? postToEdit.author : undefined}
                            disabled={isEditMode}
                            ref={(input) => this.inputAuthor = input} />
                    </div>

                    <div className="rd-add-post-subheader">Title</div>
                    <div className="rd-add-post-title">
                        <input
                            className="rd-add-post-input"
                            type="text"
                            placeholder="Post Title"
                            defaultValue={(isEditMode) ? postToEdit.title : undefined}
                            ref={(input) => this.inputTitle = input} />
                    </div>

                    <div className="rd-add-post-subheader">Body</div>
                    <div className="rd-add-post-body">
                        <textarea
                            className="rd-add-post-input rd-add-post-textarea"
                            placeholder="Post Content"
                            defaultValue={(isEditMode) ? postToEdit.body : undefined}
                            value={this.state.value}
                            onChange={this._handleTextAreaChange.bind(this)} />
                    </div>

                    <div className="rd-modal-buttons">
                        <div className="rd-modal-button"
                            onClick={() => { if (onCancelButton) { onCancelButton(); }}} >
                            Cancel
                        </div>
                        <div className="rd-modal-button rd-modal-button-add"
                            onClick={() => {
                                this._onAddOrEditButton();
                                if (onAddButton) { onAddButton(); }
                            }} >
                            {(isEditMode) ? 'Submit Changes' : 'Add'}
                        </div>
                    </div>
                </div>
            </Modal>
        );
    };
}

export default connect()(AddPostDialog);
