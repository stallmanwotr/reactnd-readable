import * as Types from '../actions/Types';
import { UP_VOTE } from '../utils/Consts';
import { reduceToObjectById } from '../utils/Utils';

const initialAllState = { categories: [], posts: {} };

/**
 * The 'allReducer' deals with full sets of data (categories and posts), and is
 * typically used for the front page.
 */
export function allReducer(state = initialAllState, action) {
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
            posts: reduceToObjectById(action.posts)
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
};

