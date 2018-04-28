import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostAndComments } from '../../actions/actions';
import CommentItem from '../CommentItem';
import './PostPage.css';

// Map the app state to component props.
const mapStateToProps = (state, ownProps) => {
    const { postId } = ownProps;

    let post = null;
    let comments = [];
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
        comments: []
    };
            
    componentDidMount() {
        const { postId, dispatch } = this.props;

        // initial: fetch and update the app state.
        if (postId) {
            console.info('Fetching post: ' + postId);
            dispatch(fetchPostAndComments(postId));
        }
    }

    render() {
        const { postId, post, comments } = this.props;
        console.info('Render post: ' + postId + ' ' +
                     ((post && post.title) ? `'${post.title}'` : null));

        if (!post || post.deleted) {
            return null;
        }
        return (
            <div className="rd-post-page">
                <div className="rd-post-header">
                    <div className="rd-post-header-line1">{post.title}</div>
                    <div className="rd-post-header-line2">
                        {post.voteScore} points, 1 hour ago by {post.author}
                    </div>
                </div>
                <div className="rd-post-body">
                    <div>{post.body}</div>
                </div>
                <div className="rd-post-comments">
                    <div className="rd-post-comments-header">Comments:</div>
                    { comments.map((comment) => (
                        <CommentItem key={comment.id} comment={comment} />
                    ))}
                </div>
            </div>
        );
    };
}

export default connect(mapStateToProps)(PostPage);
