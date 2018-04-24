import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CommentItem from './CommentItem';
import * as ReadableAPI from '../api/ReadableAPI';
import './PostPage.css';

/**
 * (Routed Page)
 * Shows an individual post and the comments below it.
 *
 * Example Post JSON:
 * {  
 *    "id":"8xf0y6ziyjabvozdd253nd",
 *    "timestamp":1467166872634,
 *    "title":"Udacity is the best place to learn React",
 *    "body":"Everyone says so after all.",
 *    "author":"thingtwo",
 *    "category":"react",
 *    "voteScore":6,
 *    "deleted":false,
 *    "commentCount":2
 * }
 *
 * Example Comment JSON:
 * [{  
 *     "id":"894tuq4ut84ut8v4t8wun89g",
 *     "parentId":"8xf0y6ziyjabvozdd253nd",
 *     "timestamp":1468166872634,
 *     "body":"Hi there! I am a COMMENT.",
 *     "author":"thingtwo",
 *     "voteScore":6,
 *     "deleted":false,
 *     "parentDeleted":false
 * },
 * ...
 * ]
 */
class PostPage extends Component {

    static propTypes = {
        postId: PropTypes.string.isRequired
    }

    state = {
        post: null
    }

    _fetchPostComments(post) {
        const postId = post.id;

        ReadableAPI.getPostComments(postId).then((response) => {
            const comments = (Array.isArray(response)) ? response : [];
            console.info('Got comments:\n' + JSON.stringify(comments));

            this.setState({ post, comments });
        });
    }

    _fetchPost(postId) {
        ReadableAPI.getPost(postId).then((response) => {
            const post = (response && response.id) ? response : null;
            console.info('Got post:\n' + JSON.stringify(post));
            //this.setState({ post });

            this._fetchPostComments(post);
        });
    }

    componentDidMount() {
        const { postId } = this.props;
        if (postId) {
            this._fetchPost(postId);
        }
    }

    render() {
        const { postId } = this.props;
        const { post, comments } = this.state;
        console.info('postId: ' + postId);

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

export default PostPage;
