import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import UpDownButtons from './buttons/UpDownButtons';
import { voteOnComment  } from '../actions/actions';
import { formatTimestamp } from '../utils/Utils';
import { UP_VOTE, DOWN_VOTE } from '../utils/Consts';
import './CommentItem.css';

/**
 * An individual comment, including score and voting buttons.
 */
class CommentItem extends Component {

    static propTypes = {
        comment: PropTypes.object.isRequired,

        /** Handlers: When the user clicks to edit/delete the comment. */
        onEditComment: PropTypes.func,
        onDeleteComment: PropTypes.func
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
        const { comment, onEditComment, onDeleteComment } = this.props;

        const commentPoints = comment.voteScore +
            ((comment.voteScore === 1) ? ' point' : ' points');
        const commentTime = formatTimestamp(comment.timestamp);
        const commentBy = `posted ${commentTime} by ${comment.author}`;

        return (
            <div className="rd-comment-item">
                <UpDownButtons
                    onClickUp={this._onVoteUp.bind(this)}
                    onClickDown={this._onVoteDown.bind(this)} />
                <div>
                    <div className="rd-comment-body">{comment.body}</div>
                    <div className="rd-comment-meta">
                        {commentPoints} / {commentBy} [
                        <span
                            className="rd-comment-meta-clickable"
                            onClick={() => { if (onEditComment) { onEditComment(); }}} >
                            edit</span>,&nbsp;
                        <span
                            className="rd-comment-meta-clickable"
                            onClick={() => { if (onDeleteComment) { onDeleteComment(); }}} >
                            delete</span>]
                    </div>
                </div>
            </div>
        );
    };
}

export default connect()(CommentItem);
