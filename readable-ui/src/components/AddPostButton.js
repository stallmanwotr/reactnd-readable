/* eslint camelcase: 0 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Icon from 'react-icons-kit';
import { ic_add } from 'react-icons-kit/md/ic_add';
import './AddPostButton.css';

/**
 * Button for adding a new user post.
 */
class AddPostButton extends Component {

    static propTypes = {
        /** Handlers: When the user clicks a button. */
        onAddPost: PropTypes.func,
    }

    render() {
        const { onAddPost } = this.props;
        return (
            <div className="rd-add-post-button"
                onClick={() => { if (onAddPost) { onAddPost(); } }} >
                <div className="rd-header-button">
                    <Icon icon={ic_add} size={28}/>
                </div>
            </div>
        );
    };
    
}

export default AddPostButton;
