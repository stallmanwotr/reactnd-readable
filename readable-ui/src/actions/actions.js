import * as ReadableAPI from '../api/ReadableAPI';

/** Action Types */
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

/** Action Creators */
export const receiveCategories = categories => ({
    type: RECEIVE_CATEGORIES,
    categories
});

/** Thunks */
export const fetchCategories = () => dispatch => (
    ReadableAPI.getCategories()
        .then(response =>
            dispatch(receiveCategories(response.categories)))
);
