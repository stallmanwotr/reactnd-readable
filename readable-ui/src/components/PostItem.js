import React, { Component } from 'react';
import Icon from 'react-icons-kit';
import { chevronDown } from 'react-icons-kit/fa/chevronDown';
import { chevronUp } from 'react-icons-kit/fa/chevronUp';
import { Link } from 'react-router-dom';
import './PostItem.css';

/**
 * A short summary of a post.
 *   It renders the title, author and buttons to up/down vote.
 *
 * Example Post:
 * {
 *     "id":"8xf0y6ziyjabvozdd253nd",
 *     "timestamp":1467166872634,
 *     "title":"Udacity is the best place to learn React",
 *     "body":"Everyone says so after all.",
 *     "author":"thingtwo",
 *     "category":"react",
 *     "voteScore":6,
 *     "deleted":false,
 *     "commentCount":2
 * }
 */
class PostItem extends Component {

    render() {
        const { post } = this.props;
        const postTo = `/${post.category}/${post.id}`;

        return (
            <div className="rbl-post-item">
                <div className="rbl-post-buttons">
                    <Icon icon={chevronUp} size={16} />
                    <Icon icon={chevronDown} size={16} />
                </div>
                <div className="rbl-post-summary">
                    <div className="rbl-post-title">
                        <Link to={postTo}>{post.title}</Link>
                    </div>
                    <div className="rbl-post-2nd-line">
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

export default PostItem;


