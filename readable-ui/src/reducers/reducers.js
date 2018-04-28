import { combineReducers } from 'redux';
import {
    RECEIVE_CATEGORIES,
    RECEIVE_CATEGORY_POSTS,
    RECEIVE_POST_AND_COMMENTS,
    RECEIVE_POSTS
} from '../actions/actions';

const initialState = {
    all: {},
    categories: [],
    posts: []
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

function postReducer(state = initialState, action) {
    console.info('REDUCER: postReducer ' + action.type);
    switch (action.type) {
    case RECEIVE_POST_AND_COMMENTS:
        const { post, comments } = action;
        return {
            ...state,
            [post.id]: {
                ...state[post.id],
                post,
                comments
            }
        };
    default:
        return state;
    }
}

export default combineReducers({
    all: allReducer,
    categories: categoryReducer,
    posts: postReducer
});
