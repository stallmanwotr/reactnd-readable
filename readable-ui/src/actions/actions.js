import * as ReadableAPI from '../api/ReadableAPI';

/** Action Types */
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_CATEGORY_POSTS = 'RECEIVE_CATEGORY_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

/** Action Creators */
export const receiveCategories = categories => ({
    type: RECEIVE_CATEGORIES,
    categories
});

export const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
});

export const receiveCategoryPosts = (category, posts) => ({
    type: RECEIVE_CATEGORY_POSTS,
    category,
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

export const fetchCategoryPosts = (category) => dispatch => (
    ReadableAPI.getCategoryPosts(category)
        .then(response =>
            dispatch(receiveCategoryPosts(category, response)))
);

