import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostAndComments } from '../../actions/actions';
import CommentItem from '../CommentItem';
import UpDownButtons from '../buttons/UpDownButtons';
import AddCommentButton from '../buttons/AddCommentButton';
import EditPostButton from '../buttons/EditPostButton';
import AddPostDialog from '../dialogs/AddPostDialog';
import { voteOnPost, UP_VOTE, DOWN_VOTE } from '../../actions/actions';
import { formatTimestamp } from '../../utils/Utils';
import './PostPage.css';

// Map the app state to component props.
const mapStateToProps = (state, ownProps) => {
    const { postId } = ownProps;

    let post = null;
    let comments = {};
    if (state.posts && state.posts[postId]) {
        post = state.posts[postId].post;
        comments = state.posts[postId].comments;
    }

    return { post, comments };
};

/**
 * (Routed Page)
 * Shows an individual post and the comments below it.
 */
class PostPage extends Component {

    static propTypes = {
        /** The id for the user post. */
        postId: PropTypes.string.isRequired
    }

    state = {
        post: null,
        comments: [],
        showEditPostDialog: false
    };
            
    componentDidMount() {
        const { postId, dispatch } = this.props;

        // fetch and update the app state.
        if (postId) {
            console.info('Fetching post: ' + postId);
            dispatch(fetchPostAndComments(postId));
        }
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

    _onAddCommentButton() {
        console.info('Launching: Add Comment Dialog');
        // this.openAddPostDialog();
    }

    _openEditPostDialog() {
        console.info('Launching: Edit Post Dialog');
        this.setState(() => ({ showEditPostDialog: true }));
    }

    _closeEditPostDialog() {
        console.info('Closing: Edit Post Dialog');
        this.setState(() => ({ showEditPostDialog: false }));
    }

    render() {
        const { post, comments } = this.props;
        if (!post || post.deleted) {
            return null;
        }
        const { showEditPostDialog } = this.state;

        const postTime = formatTimestamp(post.timestamp);
        const sortedComments = Object.values(comments).sort(
            (a, b) => (a.timestamp - b.timestamp));

        return (
            <div className="rd-post-page">
                <div className="rd-post-header">
                    <UpDownButtons
                        onClickUp={this._onVoteUp.bind(this)}
                        onClickDown={this._onVoteDown.bind(this)} />
                    <div className="rd-post-header-lines">
                        <div className="rd-post-header-line1">{post.title}</div>
                        <div className="rd-post-header-line2">
                            {post.voteScore} points, posted {postTime} by {post.author}
                        </div>
                    </div>
                </div>
                <div className="rd-post-body">
                    <div>{post.body}</div>
                </div>
                <div className="rd-post-comments-bar">
                    <div className="rd-post-comments-header">Comments:</div>
                    <div className="rd-post-buttons">
                        <AddCommentButton
                            onAddComment={this._onAddCommentButton.bind(this)} />
                        <EditPostButton
                            onEditPost={this._openEditPostDialog.bind(this)} />
                    </div>
                </div>
                <div className="rd-post-comments">
                    { sortedComments.map((comment) => (
                        <CommentItem key={comment.id} comment={comment} />
                    ))}
                </div>

                <AddPostDialog
                    postToEdit={post}
                    category={post.category}
                    isModalOpen={showEditPostDialog}
                    onAddButton={this._closeEditPostDialog.bind(this)}
                    onCancelButton={this._closeEditPostDialog.bind(this)}
                />
            </div>
        );
    };
}

export default connect(mapStateToProps)(PostPage);
