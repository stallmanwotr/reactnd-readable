import * as Types from './Types';
import * as ReadableAPI from '../api/ReadableAPI';

/**
 * Actions related to posts: Get all posts, add/edit/delete a post or specify
 * the ordering for posts.
 */

/** Action Creators */

const receivePosts = posts => ({
    type: Types.RECEIVE_POSTS,
    posts
});

const receivePostAndComments = (post, comments) => ({
    type: Types.RECEIVE_POST_AND_COMMENTS,
    post,
    comments
});

const createAddPost = (postInfo) => ({
    type: Types.ADD_POST,
    postInfo
});

const createEditPost = (postInfo) => ({
    type: Types.EDIT_POST,
    postInfo
});

const createDeletePost = (postId, category) => ({
    type: Types.DELETE_POST,
    postId,
    category
});

const createVoteOnPost = (postId, option, category) => ({
    type: Types.VOTE_ON_POST,
    postId,
    option,
    category
});

export const sortPostsBy = (sortOrder) => ({
    type: Types.SORT_POSTS_BY,
    sortOrder
});


/** Thunks */

export const fetchPosts = () => dispatch => (
    ReadableAPI.getPosts()
        .then(response =>
            dispatch(receivePosts(response)))
);

export const fetchPostAndComments = (postId) => dispatch => (
    ReadableAPI.getPost(postId)
        .then(post =>
            ReadableAPI.getPostComments(postId)
                .then(comments =>
                    dispatch(receivePostAndComments(post, comments)))
        )
);

export const addPost = (postInfo) => dispatch => (
    // first, we add the post using the postInfo. then we fetch to get the post,
    // as this brings in other fields such as voteScore, commentCount.
    ReadableAPI.addPost(postInfo)
        .then(() =>
            ReadableAPI.getPost(postInfo.id)
                .then(responsePostInfo =>
                    dispatch(createAddPost(responsePostInfo))))
);

export const editPost = (postId, title, body) => dispatch => (
    ReadableAPI.editPost(postId, title, body)
        .then(() =>
            ReadableAPI.getPost(postId)
                .then(responsePostInfo =>
                    dispatch(createEditPost(responsePostInfo))))
);

export const deletePost = (postId, category) => dispatch => (
    ReadableAPI.deletePost(postId)
        .then(() =>
            dispatch(createDeletePost(postId, category)))
);

export const voteOnPost = (postId, option, category) => dispatch => (
    // (could dispatch action first, so that the UI is updated sooner.)
    ReadableAPI.voteOnPost(postId, option)
        .then(() =>
            dispatch(createVoteOnPost(postId, option, category)))
);

