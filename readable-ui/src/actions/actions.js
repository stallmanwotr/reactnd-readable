import * as ReadableAPI from '../api/ReadableAPI';

/** Action Types */

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_CATEGORY_POSTS = 'RECEIVE_CATEGORY_POSTS';
export const RECEIVE_POST_AND_COMMENTS = 'RECEIVE_POST_AND_COMMENTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

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

