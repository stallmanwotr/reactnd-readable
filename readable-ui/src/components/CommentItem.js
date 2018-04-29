import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import UpDownButtons from './UpDownButtons';
import { voteOnComment, UP_VOTE, DOWN_VOTE } from '../actions/actions';
import { formatTimestamp } from '../utils/Utils';
import './CommentItem.css';

/**
 * An individual comment, including score and voting buttons.
 */
class CommentItem extends Component {

    static propTypes = {
        comment: PropTypes.object.isRequired
    }

    _onVoteUp() {
        const { comment, dispatch } = this.props;
        const postId = comment.parentId;

        console.info('Up vote comment: ' + comment.id);
        dispatch(voteOnComment(comment.id, UP_VOTE, postId));
    }

    _onVoteDown() {
        const { comment, dispatch } = this.props;
        const postId = comment.parentId;

        console.info('Down vote comment: ' + comment.id);
        dispatch(voteOnComment(comment.id, DOWN_VOTE, postId));
    }

    render() {
        const { comment } = this.props;
        const commentTime = formatTimestamp(comment.timestamp);

        return (
            <div className="rd-comment-item">
                <UpDownButtons
                    onClickUp={this._onVoteUp.bind(this)}
                    onClickDown={this._onVoteDown.bind(this)} />
                <div>
                    <div className="rd-comment-body">{comment.body}</div>
                    <div className="rd-comment-meta">
                        {comment.voteScore} points, posted {commentTime} by {comment.author}
                    </div>
                </div>
            </div>
        );
    };
}

export default connect()(CommentItem);
