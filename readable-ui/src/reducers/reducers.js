import { combineReducers } from 'redux';
import * as Types from '../actions/Types';
import { UP_VOTE, SORT_BY_DATE } from '../utils/Consts';

/**
 * Reduces an array of objects, to a map object indexed by 'id' field.
 */
function _reduceToObjectById(values) {
    if (!Array.isArray(values)) {
        return {};
    }
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
    let postId, postInfo, option;

    switch (action.type) {
    case Types.RECEIVE_CATEGORIES:
        return {
            ...state,
            categories: action.categories
        };

    case Types.RECEIVE_POSTS:
        return {
            ...state,
            // convert the array to an object/map indexed by postId:
            posts: _reduceToObjectById(action.posts)
        };

    case Types.VOTE_ON_POST:
        ({ postId, option } = action);
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

    case Types.DELETE_POST:
        ({ postId } = action);
        if (!state.posts[postId]) {
            return state;
        }
        return {
            ...state,
            posts: {
                ...state.posts,
                [postId]: {
                    ...state.posts[postId],
                    deleted: true
                }
            }
        };

    case Types.ADD_POST:
    case Types.EDIT_POST:
        ({ postInfo } = action);
        postId = postInfo.id;
        return {
            ...state,
            posts: {
                ...state.posts,
                [postId]: postInfo
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
    case Types.RECEIVE_CATEGORY_POSTS:
        ({ category, posts } = action);
        return {
            ...state,
            [category]: {
                ...state[category],
                posts: _reduceToObjectById(posts)
            }
        };

    case Types.VOTE_ON_POST:
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

    case Types.ADD_POST:
    case Types.EDIT_POST:
        ({ postInfo } = action);
        ({ category } = postInfo);
        postId = postInfo.id;
        if (!state[category] || !state[category].posts) {
            return state;
        }
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

    case Types.DELETE_POST:
        ({ postId, category } = action);
        if (!state[category] || !state[category].posts[postId]) {
            return state;
        }
        return {
            ...state,
            [category]: {
                ...state[category],
                posts: {
                    ...state[category].posts,
                    [postId]: {
                        ...state[category].posts[postId],
                        deleted: true
                    }
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
    case Types.RECEIVE_POST_AND_COMMENTS:
        const { post, comments } = action;
        // if the fetch failed post will be undefined.
        if (!post || !post.id) {
            return state;
        }
        return {
            ...state,
            [post.id]: {
                ...state[post.id],
                post,
                // convert the array to an object/map indexed by commentId:
                comments: _reduceToObjectById(comments)
            }
        };

    case Types.VOTE_ON_POST:
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

    case Types.VOTE_ON_COMMENT:
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

    case Types.EDIT_POST:
        ({ postInfo } = action);
        postId = postInfo.id;
        return {
            ...state,
            [postId]: {
                ...state[postId],
                post: postInfo
            }
        };

    case Types.ADD_COMMENT:
    case Types.EDIT_COMMENT:
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

    case Types.DELETE_POST:
        ({ postId } = action);
        // if not on the post page.
        if (!state[postId] || state[postId].post) {
            return state;
        }
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

    case Types.DELETE_COMMENT:
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

const initialSettingsState = {
    sortPostsBy: SORT_BY_DATE
};

/**
 * This reducer keeps track of general application settings, such as the
 * prefered sort order.
 */
function settingsReducer(state = initialSettingsState, action) {
    switch (action.type) {
    case Types.SORT_POSTS_BY:
        const { sortOrder } = action;
        return {
            ...state,
            sortPostsBy: sortOrder
        };

    default:
        return state;
    }
}


export default combineReducers({
    all: allReducer,
    categories: categoryReducer,
    posts: postReducer,
    settings: settingsReducer
});
