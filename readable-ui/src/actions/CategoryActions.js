import * as Types from './Types';
import * as ReadableAPI from '../api/ReadableAPI';

/**
 * Actions related to categories: Get all categories, or the details for a specific
 * category.
 */

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


/** Thunks */

export const fetchCategories = () => dispatch => (
    ReadableAPI.getCategories()
        .then(response =>
            dispatch(receiveCategories(response.categories)))
);

export const fetchCategoryPosts = (category) => dispatch => (
    ReadableAPI.getCategoryPosts(category)
        .then(response =>
            dispatch(receiveCategoryPosts(category, response)))
);

