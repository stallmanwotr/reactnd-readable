/* eslint camelcase: 0 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Icon from 'react-icons-kit';
import { trashO } from 'react-icons-kit/fa/trashO';
import './PostPageButton.css';

/**
 * Button for deleting an existing post.
 */
class DeletePostButton extends Component {

    static propTypes = {
        /** Handler: When the user clicks the button. */
        onDeletePost: PropTypes.func,
    }

    render() {
        const { onDeletePost } = this.props;
        return (
            <div className="rd-post-page-button rd-post-page-button-delete"
                onClick={() => { if (onDeletePost) { onDeletePost(); } }} >
                <div className="rd-post-page-button-icon">
                    <Icon icon={trashO} size={24}/>
                </div>
                <div className="rd-post-page-button-text">Delete Post</div>
            </div>
        );
    };
    
}

export default DeletePostButton;
