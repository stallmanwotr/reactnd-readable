import * as ReadableAPI from '../api/ReadableAPI';

/** Constants */

export const UP_VOTE = 'upVote';
export const DOWN_VOTE = 'downVote';

/** Action Types */

export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_CATEGORY_POSTS = 'RECEIVE_CATEGORY_POSTS';
export const RECEIVE_POST_AND_COMMENTS = 'RECEIVE_POST_AND_COMMENTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const VOTE_ON_COMMENT = 'VOTE_ON_COMMENT';
export const VOTE_ON_POST = 'VOTE_ON_POST';

/** Action Creators */

const receiveCategories = categories => ({
    type: RECEIVE_CATEGORIES,
    categories
});

const receiveCategoryPosts = (category, posts) => ({
    type: RECEIVE_CATEGORY_POSTS,
    category,
    posts
});

const receivePostAndComments = (post, comments) => ({
    type: RECEIVE_POST_AND_COMMENTS,
    post,
    comments
});

const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
});

const createVoteOnComment = (commentId, option, postId) => ({
    type: VOTE_ON_COMMENT,
    commentId,
    option,
    postId
});

const createVoteOnPost = (postId, option, category) => ({
    type: VOTE_ON_POST,
    postId,
    option,
    category
});

const createAddPost = (postInfo) => ({
    type: ADD_POST,
    postInfo
});

const createEditPost = (postInfo) => ({
    type: EDIT_POST,
    postInfo
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
                    dispatch(receivePostAndComments(post, comments))))
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
