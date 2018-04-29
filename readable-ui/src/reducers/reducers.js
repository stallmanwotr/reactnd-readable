import { combineReducers } from 'redux';
import {
    RECEIVE_CATEGORIES,
    RECEIVE_CATEGORY_POSTS,
    RECEIVE_POST_AND_COMMENTS,
    RECEIVE_POSTS,
    UP_VOTE,
    VOTE_ON_POST
} from '../actions/actions';

/**
 * Reduces an array of objects, to a single object/map indexed by 'id' value.
 */
function _reduceToObjectById(values) {
    return values.reduce((obj, item) => {
        obj[item.id] = item;
        return obj;
    }, {});
}

const initialAllState = { categories: [], posts: {} };

/**
 * The 'allReducer' deals with full sets of data (categories and posts), and is
 * typically used for the front page.
 */
function allReducer(state = initialAllState, action) {
    switch (action.type) {
    case RECEIVE_CATEGORIES:
        return {
            ...state,
            categories: action.categories
        };
    case RECEIVE_POSTS:
        return {
            ...state,
            // convert the array to an object/map indexed by postId:
            posts: _reduceToObjectById(action.posts)
        };
    case VOTE_ON_POST:
        const { postId, option } = action;
        if (!state.posts || !state.posts[postId]) {
            return state;
        }
        const voteDelta = (option === UP_VOTE) ? 1 : -1;
        const newScore = state.posts[postId].voteScore + voteDelta;
        return {
            ...state,
            posts: {
                ...state.posts,
                [postId]: {
                    ...state.posts[postId],
                    voteScore: newScore
                }
            }
        };
    default:
        return state;
    }
}

/**
 * The 'categoryReducer' is an array of per-category information. Primarily it
 * sets the user posts for each category.
 */
function categoryReducer(state = {}, action) {
    const { category } = action;

    switch (action.type) {
    case RECEIVE_CATEGORY_POSTS:
        const { posts } = action;
        return {
            ...state,
            [category]: {
                ...state[category],
                posts: _reduceToObjectById(posts)
            }
        };
    case VOTE_ON_POST:
        const { postId, option } = action;
        if (!state[category] || !state[category].posts[postId]) {
            return state;
        }
        const voteDelta = (option === UP_VOTE) ? 1 : -1;
        const newScore = state[category].posts[postId].voteScore + voteDelta;
        return {
            ...state,
            [category]: {
                ...state[category],
                posts: {
                    ...state[category].posts,
                    [postId]: {
                        ...state[category].posts[postId],
                        voteScore: newScore
                    }
                }
            }
        };
    default:
        return state;
    }
}

/**
 * The 'postReducer' handles individual posts and their associated comments.
 */
function postReducer(state = {}, action) {
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
    case VOTE_ON_POST:
        const { postId, option } = action;
        if (!state[postId] || !state[postId].post) {
            return state;
        }
        const voteDelta = (option === UP_VOTE) ? 1 : -1;
        const newScore = state[postId].post.voteScore + voteDelta;
        return {
            ...state,
            [postId]: {
                ...state[postId],
                post: {
                    ...state[postId].post,
                    voteScore: newScore
                }
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
