import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { voteOnPost, UP_VOTE, DOWN_VOTE } from '../actions/actions';
import UpDownButtons from './UpDownButtons';
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
        const { post } = this.props;
        const postTo = `/${post.category}/${post.id}`;

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

export default connect()(PostSummaryItem);
