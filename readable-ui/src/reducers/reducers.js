import { combineReducers } from 'redux';
import {
    ADD_POST,
    ADD_COMMENT,
    DELETE_COMMENT,
    DELETE_POST,
    EDIT_POST,
    EDIT_COMMENT,
    RECEIVE_CATEGORIES,
    RECEIVE_CATEGORY_POSTS,
    RECEIVE_POST_AND_COMMENTS,
    RECEIVE_POSTS,
    UP_VOTE,
    VOTE_ON_COMMENT,
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
    let category, postId, posts;
    let option, postInfo;

    switch (action.type) {
    case RECEIVE_CATEGORY_POSTS:
        ({ category, posts } = action);
        return {
            ...state,
            [category]: {
                ...state[category],
                posts: _reduceToObjectById(posts)
            }
        };

    case VOTE_ON_POST:
        ({ postId, option, category } = action);
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

    case ADD_POST:
        ({ postInfo } = action);
        postId = postInfo.id;
        category = postInfo.category;
        return {
            ...state,
            [category]: {
                ...state[category],
                posts: {
                    ...state[category].posts,
                    [postId]: postInfo
                }
            }
        };

    default:
        return state;
    }
}

/**
 * The 'postReducer' handles individual posts and their comments. It loosely
 * corresponds to the 'post' pages.
 */
function postReducer(state = {}, action) {
    let postId, postInfo;
    let commentId, commentInfo;
    let option, voteDelta, newScore;

    switch (action.type) {
    case RECEIVE_POST_AND_COMMENTS:
        const { post, comments } = action;
        return {
            ...state,
            [post.id]: {
                ...state[post.id],
                post,
                // convert the array to an object/map indexed by commentId:
                comments: _reduceToObjectById(comments)
            }
        };

    case VOTE_ON_POST:
        ({ postId, option } = action);
        if (!state[postId] || !state[postId].post) {
            return state;
        }
        voteDelta = (option === UP_VOTE) ? 1 : -1;
        newScore = state[postId].post.voteScore + voteDelta;
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

    case VOTE_ON_COMMENT:
        ({ commentId, option, postId } = action);
        if (!state[postId] || !state[postId].comments[commentId]) {
            return state;
        }
        voteDelta = (option === UP_VOTE) ? 1 : -1;
        newScore = state[postId].comments[commentId].voteScore + voteDelta;
        return {
            ...state,
            [postId]: {
                ...state[postId],
                comments: {
                    ...state[postId].comments,
                    [commentId]: {
                        ...state[postId].comments[commentId],
                        voteScore: newScore
                    }
                }
            }
        };

    case EDIT_POST:
        ({ postInfo } = action);
        postId = postInfo.id;
        return {
            ...state,
            [postId]: {
                ...state[postId],
                post: postInfo
            }
        };

    case ADD_COMMENT:
    case EDIT_COMMENT:
        ({ commentInfo } = action);
        commentId = commentInfo.id;
        postId = commentInfo.parentId;
        return {
            ...state,
            [postId]: {
                ...state[postId],
                comments: {
                    ...state[postId].comments,
                    [commentId]: commentInfo
                }
            }
        };

    case DELETE_POST:
        ({ postId } = action);
        return {
            ...state,
            [postId]: {
                ...state[postId],
                post: {
                    ...state[postId].post,
                    deleted: true
                }
            }
        };

    case DELETE_COMMENT:
        ({ postId, commentId } = action);
        return {
            ...state,
            [postId]: {
                ...state[postId],
                comments: {
                    ...state[postId].comments,
                    [commentId]: {
                        ...state[postId].comments[commentId],
                        deleted: true
                    }
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
