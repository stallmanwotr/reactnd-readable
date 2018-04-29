import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';
import { addPost } from '../../actions/actions';
import './AddPostDialog.css';

/**
 * (Dialog Box)
 * Allows a new post to be added.
 */
class AddPostDialog extends Component {

    static propTypes = {
        category: PropTypes.string.isRequired,

        /** The user post to be shown. */
        isModalOpen: PropTypes.bool.isRequired,

        /** Handlers: When the user clicks a button. */
        onAddButton: PropTypes.func,
        onCancelButton: PropTypes.func
    }

    state = {
        textAreaValue: ''
    }

    componentWillMount() {
        Modal.setAppElement('body');
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

    _handleTextAreaChange(event) {
        this.setState({textAreaValue: event.target.value});
    }

    render() {
        const { isModalOpen, onAddButton, onCancelButton } = this.props;

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
                        Add a Post
                    </div>

                    <div className="rd-add-post-subheader">Author</div>
                    <div className="rd-add-post-author">
                        <input
                            className="rd-add-post-input"
                            type="text"
                            placeholder="Author"
                            ref={(input) => this.inputAuthor = input} />
                    </div>

                    <div className="rd-add-post-subheader">Title</div>
                    <div className="rd-add-post-title">
                        <input
                            className="rd-add-post-input"
                            type="text"
                            placeholder="Post Title"
                            ref={(input) => this.inputTitle = input} />
                    </div>

                    <div className="rd-add-post-subheader">Body</div>
                    <div className="rd-add-post-body">
                        <textarea
                            className="rd-add-post-input rd-add-post-textarea"
                            value={this.state.value}
                            placeholder="Post Content"
                            onChange={this._handleTextAreaChange.bind(this)} />
                    </div>

                    <div className="rd-modal-buttons">
                        <div className="rd-modal-button"
                            onClick={() => { if (onCancelButton) { onCancelButton(); }}} >
                            Cancel
                        </div>
                        <div className="rd-modal-button rd-modal-button-add"
                            onClick={() => {
                                this._onAddButton();
                                if (onAddButton) { onAddButton(); }
                            }} >
                            Add
                        </div>
                    </div>
                </div>
            </Modal>
        );
    };
}

export default connect()(AddPostDialog);
