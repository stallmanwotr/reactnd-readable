import { combineReducers } from 'redux';
import {
    RECEIVE_CATEGORIES,
    RECEIVE_CATEGORY_POSTS,
    RECEIVE_POSTS
} from '../actions/actions';

const initialState = {
    categories: []
};

// reducers

function allReducer(state = initialState, action) {
    console.info('REDUCER: allReducer ' + action.type);
    switch (action.type) {
    case RECEIVE_CATEGORIES:
        return {
            ...state,
            categories: action.categories
        };
    case RECEIVE_POSTS:
        return {
            ...state,
            posts: action.posts
        };
    default:
        return state;
    }
}

function categoryReducer(state = initialState, action) {
    console.info('REDUCER: categoryReducer ' + action.type);
    switch (action.type) {
    case RECEIVE_CATEGORY_POSTS:
        const { category, posts } = action;
        console.log('*** ' + category + ' --> ' + JSON.stringify(posts));
        return {
            ...state,
            [category]: {
                ...state[category],
                posts
            }
        };
    default:
        return state;
    }
}

export default combineReducers({
    all: allReducer,
    categories: categoryReducer
});
