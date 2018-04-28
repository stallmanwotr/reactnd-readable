import * as ReadableAPI from '../api/ReadableAPI';

/** Constants */

export const UP_VOTE = 'upVote';
export const DOWN_VOTE = 'downVote';

/** Action Types */

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_CATEGORY_POSTS = 'RECEIVE_CATEGORY_POSTS';
export const RECEIVE_POST_AND_COMMENTS = 'RECEIVE_POST_AND_COMMENTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const VOTE_ON_POST = 'VOTE_ON_POST';

/** Action Creators */

export const receiveCategories = categories => ({
    type: RECEIVE_CATEGORIES,
    categories
});

export const receiveCategoryPosts = (category, posts) => ({
    type: RECEIVE_CATEGORY_POSTS,
    category,
    posts
});

export const receivePostAndComments = (post, comments) => ({
    type: RECEIVE_POST_AND_COMMENTS,
    post,
    comments
});

export const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
});

export const createVoteOnPost = (postId, option) => ({
    type: VOTE_ON_POST,
    postId,
    option
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

export const voteOnPost = (postId, option) => dispatch => (
    // (could dispatch action first, so that the UI is updated sooner.)
    ReadableAPI.voteOnPost(postId, option)
        .then(() =>
            dispatch(createVoteOnPost(postId, option)))
);
