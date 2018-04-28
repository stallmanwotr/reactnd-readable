import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Icon from 'react-icons-kit';
import { chevronDown } from 'react-icons-kit/fa/chevronDown';
import { chevronUp } from 'react-icons-kit/fa/chevronUp';
import { Link } from 'react-router-dom';
import './PostSummaryItem.css';

/**
 * A short summary of a user post.
 *   It renders the title, author and buttons to up/down vote.
 */
class PostSummaryItem extends Component {

    static propTypes = {
        /** The user post to be shown. */
        post: PropTypes.object.isRequired
    }

    render() {
        const { post } = this.props;
        const postTo = `/${post.category}/${post.id}`;

        return (
            <div className="rd-post-summary-item">
                <div className="rd-post-buttons">
                    <Icon icon={chevronUp} size={16} />
                    <Icon icon={chevronDown} size={16} />
                </div>
                <div className="rd-post-summary">
                    <div className="rd-post-title">
                        <Link to={postTo}>{post.title}</Link>
                    </div>
                    <div className="rd-post-2nd-line">
                        <div>{post.voteScore} points</div>
                        <div>-- {post.category} --</div>
                        <div>{post.commentCount} comments</div>
                        <div>posted by {post.author}</div>
                    </div>
                </div>
            </div>
        );
    };
}

export default PostSummaryItem;


