import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    fetchPostAndComments,
    deleteComment,
    deletePost,
    voteOnPost,
    UP_VOTE,
    DOWN_VOTE
} from '../../actions/actions';
import CommentItem from '../CommentItem';
import UpDownButtons from '../buttons/UpDownButtons';
import AddCommentButton from '../buttons/AddCommentButton';
import DeletePostButton from '../buttons/DeletePostButton';
import EditPostButton from '../buttons/EditPostButton';
import AddCommentDialog from '../dialogs/AddCommentDialog';
import AddPostDialog from '../dialogs/AddPostDialog';
import { formatTimestamp } from '../../utils/Utils';
import './PostPage.css';

// Map the app state to component props.
const mapStateToProps = (state, ownProps) => {
    const { postId } = ownProps;

    let post = undefined;
    let comments = {};
    if (state.posts && state.posts[postId]) {
        post = state.posts[postId].post;
        comments = state.posts[postId].comments || {};
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
        showAddCommentDialog: false,
        commentToEdit: undefined,
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
        dispatch(voteOnPost(post.id, UP_VOTE, post.category));
    }

    _onVoteDown() {
        const { post, dispatch } = this.props;
        dispatch(voteOnPost(post.id, DOWN_VOTE, post.category));
    }

    _openAddCommentDialog() {
        this.setState(() => ({
            showAddCommentDialog: true,
            commentToEdit: undefined
        }));
    }

    _closeAddCommentDialog() {
        this.setState(() => ({
            showAddCommentDialog: false,
            commentToEdit: undefined
        }));
    }

    _openEditCommentDialog(comment) {
        this.setState(() => ({
            showAddCommentDialog: true,
            commentToEdit: comment
        }));
    }

    _openEditPostDialog() {
        this.setState(() => ({ showEditPostDialog: true }));
    }

    _closeEditPostDialog() {
        this.setState(() => ({ showEditPostDialog: false }));
    }

    _deletePost() {
        const { postId, post, dispatch, history } = this.props;
        const { category } = post;

        console.info('Deleting post: ' + postId);
        dispatch(deletePost(postId));

        // redirect to the category page.
        history.push(`/${category}`);
    }

    _deleteComment(comment) {
        const { postId, dispatch } = this.props;
        const commentId = comment.id;
        dispatch(deleteComment(postId, commentId));
    }

    render() {
        const { post, comments } = this.props;
        console.info('PostPage.render: ' + ((post) ? post.id : 'undefined'));

        if (!post || post.deleted) {
            return null;
        }
        const { category } = post;
        const { showAddCommentDialog, showEditPostDialog, commentToEdit } = this.state;

        const sortCompare = (a, b) => (a.timestamp - b.timestamp);
        const sortedComments = Object.values(comments).sort(sortCompare)
            .filter((c) => c.deleted === false);
        const commentCount = sortedComments.length;

        const postPoints = post.voteScore + ((post.voteScore === 1) ? ' point' : ' points');
        const postComments = commentCount + ((commentCount === 1) ? ' comment' : ' comments');
        const postTime = formatTimestamp(post.timestamp);
        const postedBy = `posted ${postTime} by ${post.author}`;

        return (
            <div className="rd-post-page">
                <div className="rd-category-header">
                    <div className="rd-category-title">
                        {category}
                    </div>
                </div>
                <div className="rd-post-page-content">
                    <div className="rd-post-header">
                        <UpDownButtons
                            onClickUp={this._onVoteUp.bind(this)}
                            onClickDown={this._onVoteDown.bind(this)} />
                        <div className="rd-post-header-lines">
                            <div className="rd-post-header-line1">{post.title}</div>
                            <div className="rd-post-header-line2">
                                {postPoints} / {postComments} / {postedBy}
                            </div>
                        </div>
                    </div>
                    <div className="rd-post-body">
                        <div>{post.body}</div>
                    </div>
                    <div className="rd-post-comments-bar">
                        <div className="rd-post-buttons">
                            <AddCommentButton
                                onAddComment={this._openAddCommentDialog.bind(this)} />
                            <EditPostButton
                                onEditPost={this._openEditPostDialog.bind(this)} />
                            <DeletePostButton
                                onDeletePost={this._deletePost.bind(this)} />
                        </div>
                    </div>
                    <div className="rd-post-comments-header">Comments:</div>
                    <div className="rd-post-comments">
                        { sortedComments
                            .map((comment) => (
                                <CommentItem key={comment.id} comment={comment}
                                    onEditComment={() => this._openEditCommentDialog(comment)}
                                    onDeleteComment={() => this._deleteComment(comment)} />
                            ))}
                        { (sortedComments.length === 0) && (
                            <div className="rd-comment-item rd-comment-item-none">
                                No comments here!
                            </div>
                        )}
                    </div>
                </div>
    
                <AddPostDialog
                    postToEdit={post}
                    category={post.category}
                    isModalOpen={showEditPostDialog}
                    onCloseModal={this._closeEditPostDialog.bind(this)}
                />

                <AddCommentDialog
                    postId={post.id}
                    commentToEdit={commentToEdit}
                    isModalOpen={showAddCommentDialog}
                    onCloseModal={this._closeAddCommentDialog.bind(this)}
                />
            </div>
        );
    };
}

const connectComponent = connect(mapStateToProps)(PostPage);

export default withRouter(connectComponent);
