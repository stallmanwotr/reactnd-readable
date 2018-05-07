import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { voteOnPost, UP_VOTE, DOWN_VOTE } from '../actions/actions';
import UpDownButtons from './buttons/UpDownButtons';
import { formatTimestamp } from '../utils/Utils';
import './PostSummaryItem.css';

/**
 * A short summary of a user post.
 *   It renders the title, author and buttons to up/down vote.
 */
class PostSummaryItem extends Component {

    static propTypes = {
        /** The user post to be shown. */
        post: PropTypes.object.isRequired,

        /** Handlers: When the user clicks to edit/delete a post. */
        onEditPost: PropTypes.func,
        onDeletePost: PropTypes.func
    }

    _onVoteUp() {
        const { post, dispatch } = this.props;
        console.info('Up vote post: ' + post.id);
        dispatch(voteOnPost(post.id, UP_VOTE, post.category));
    }

    _onVoteDown() {
        const { post, dispatch } = this.props;
        console.info('Down vote post: ' + post.id);
        dispatch(voteOnPost(post.id, DOWN_VOTE, post.category));
    }

    render() {
        const { post, onEditPost, onDeletePost } = this.props;

        const postPoints = post.voteScore + ((post.voteScore === 1) ? ' point' : ' points');
        const postTo = `/${post.category}/${post.id}`;
        const postTime = formatTimestamp(post.timestamp);
        const postedBy = `posted ${postTime} by ${post.author}`;
        const postComments = post.commentCount + ((post.commentCount === 1) ? ' comment' : ' comments');

        return (
            <div className="rd-post-summary-item">
                <UpDownButtons
                    onClickUp={this._onVoteUp.bind(this)}
                    onClickDown={this._onVoteDown.bind(this)} />
                <div className="rd-post-summary">
                    <div className="rd-post-title">
                        <Link to={postTo}>{post.title}</Link>
                    </div>
                    <div className="rd-post-2nd-line">
                        <span>
                            {postPoints} / {postComments} in
                            <Link to={'/' + post.category}>-- {post.category} --</Link>
                            / {postedBy}
                        </span>
                        &nbsp;[
                        <span
                            className="rd-post-meta-clickable"
                            onClick={() => { if (onEditPost) { onEditPost(); }}} >
                            edit</span>,&nbsp;
                        <span
                            className="rd-post-meta-clickable"
                            onClick={() => { if (onDeletePost) { onDeletePost(); }}} >
                            delete</span>]
                    </div>
                </div>
            </div>
        );
    };
}

export default connect()(PostSummaryItem);
