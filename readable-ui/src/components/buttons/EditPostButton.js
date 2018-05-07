/* eslint camelcase: 0 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import './PostPageButton.css';

/**
 * Button for editing an existing post.
 */
class EditPostButton extends Component {

    static propTypes = {
        /** Handler: When the user clicks the button. */
        onEditPost: PropTypes.func,
    }

    render() {
        const { onEditPost } = this.props;
        return (
            <div className="rd-post-page-button"
                onClick={() => { if (onEditPost) { onEditPost(); } }} >
                <div className="rd-post-page-button-icon">
                    <Icon icon={pencil} size={24}/>
                </div>
                <div className="rd-post-page-button-text">Edit Post</div>
            </div>
        );
    };
}

export default EditPostButton;
