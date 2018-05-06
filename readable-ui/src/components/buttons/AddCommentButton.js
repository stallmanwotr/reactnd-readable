/* eslint camelcase: 0 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Icon from 'react-icons-kit';
import { commentO } from 'react-icons-kit/fa/commentO';
import './PostPageButton.css';

/**
 * Button for adding a new comment.
 */
class AddCommentButton extends Component {

    static propTypes = {
        /** Handlers: When the user clicks a button. */
        onAddComment: PropTypes.func,
    }

    render() {
        const { onAddComment } = this.props;
        return (
            <div className="rd-post-page-button"
                onClick={() => { if (onAddComment) { onAddComment(); } }} >
                <div className="rd-post-page-button-icon">
                    <Icon icon={commentO} size={24}/>
                </div>
                <div className="rd-post-page-button-text">Add Comment</div>
            </div>
        );
    };
    
}

export default AddCommentButton;
