import * as Types from './Types';
import * as ReadableAPI from '../api/ReadableAPI';

/** Action Creators */

const receiveCategories = categories => ({
    type: Types.RECEIVE_CATEGORIES,
    categories
});

const receiveCategoryPosts = (category, posts) => ({
    type: Types.RECEIVE_CATEGORY_POSTS,
    category,
    posts
});

const receivePostAndComments = (post, comments) => ({
    type: Types.RECEIVE_POST_AND_COMMENTS,
    post,
    comments
});

const receivePosts = posts => ({
    type: Types.RECEIVE_POSTS,
    posts
});

const createVoteOnComment = (commentId, option, postId) => ({
    type: Types.VOTE_ON_COMMENT,
    commentId,
    option,
    postId
});

const createVoteOnPost = (postId, option, category) => ({
    type: Types.VOTE_ON_POST,
    postId,
    option,
    category
});

const createAddPost = (postInfo) => ({
    type: Types.ADD_POST,
    postInfo
});

const createEditPost = (postInfo) => ({
    type: Types.EDIT_POST,
    postInfo
});

const createAddComment = (commentInfo) => ({
    type: Types.ADD_COMMENT,
    commentInfo
});

const createEditComment = (commentInfo) => ({
    type: Types.EDIT_COMMENT,
    commentInfo
});

const createDeletePost = (postId, category) => ({
    type: Types.DELETE_POST,
    postId,
    category
});

const createDeleteComment = (postId, commentId) => ({
    type: Types.DELETE_COMMENT,
    postId,
    commentId
});

export const sortPostsBy = (sortOrder) => ({
    type: Types.SORT_POSTS_BY,
    sortOrder
});

/** Thunks */

export const fetchCategories = () => dispatch => (
    ReadableAPI.getCategories()
        .then(response =>
            dispatch(receiveCategories(response.categories)))
);

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

export const fetchCategoryPosts = (category) => dispatch => (
    ReadableAPI.getCategoryPosts(category)
        .then(response =>
            dispatch(receiveCategoryPosts(category, response)))
);

export const voteOnComment = (commentId, option, postId) => dispatch => (
    // (could dispatch action first, so that the UI is updated sooner.)
    ReadableAPI.voteOnComment(commentId, option)
        .then(() =>
            dispatch(createVoteOnComment(commentId, option, postId)))
);

export const voteOnPost = (postId, option, category) => dispatch => (
    // (could dispatch action first, so that the UI is updated sooner.)
    ReadableAPI.voteOnPost(postId, option)
        .then(() =>
            dispatch(createVoteOnPost(postId, option, category)))
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

export const addComment = (commentInfo) => dispatch => (
    // first, we add the comment using the commentInfo. then we fetch to get the
    // comment, as this brings in the other fields (voteScore, deleted, etc.).
    ReadableAPI.addComment(commentInfo)
        .then(() =>
            ReadableAPI.getComment(commentInfo.id)
                .then(responseInfo =>
                    dispatch(createAddComment(responseInfo))))
);

export const editComment = (commentId, timestamp, body) => dispatch => (
    // first, we add the comment using the commentInfo. then we fetch to get the
    // comment, as this brings in the other fields (voteScore, deleted, etc.).
    ReadableAPI.editComment(commentId, timestamp, body)
        .then(() =>
            ReadableAPI.getComment(commentId)
                .then(responseInfo =>
                    dispatch(createEditComment(responseInfo))))
);

export const deletePost = (postId, category) => dispatch => (
    ReadableAPI.deletePost(postId)
        .then(() =>
            dispatch(createDeletePost(postId, category)))
);

export const deleteComment = (postId, commentId) => dispatch => (
    ReadableAPI.deleteComment(commentId)
        .then(() =>
            dispatch(createDeleteComment(postId, commentId)))
);

