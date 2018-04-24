import PropTypes from 'prop-types';
import React, { Component } from 'react';
import UpDownButtons from './UpDownButtons';
import './CommentItem.css';

/**
 * An individual comment, including vote buttons and score.
 *
 * Example Comment:
 * {  
 *     "id":"894tuq4ut84ut8v4t8wun89g",
 *     "parentId":"8xf0y6ziyjabvozdd253nd",
 *     "timestamp":1468166872634,
 *     "body":"Hi there! I am a COMMENT.",
 *     "author":"thingtwo",
 *     "voteScore":6,
 *     "deleted":false,
 *     "parentDeleted":false
 * }
 */
class CommentItem extends Component {

    static propTypes = {
        comment: PropTypes.object.isRequired
    }

    render() {
        const { comment } = this.props;
        return (
            <div className="rd-comment-item">
                <UpDownButtons />
                <div>
                    <div className="rd-comment-body">{comment.body}</div>
                    <div className="rd-comment-meta">
                        {comment.voteScore} points, 11 minutes ago by {comment.author}
                    </div>
                </div>
            </div>
        );
    };
}

export default CommentItem;
