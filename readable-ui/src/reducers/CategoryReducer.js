import * as Types from '../actions/Types';
import { UP_VOTE } from '../utils/Consts';
import { reduceToObjectById } from '../utils/Utils';

/**
 * The 'categoryReducer' is an array of per-category information. Primarily it
 * sets the user posts for each category.
 */
export function categoryReducer(state = {}, action) {
    let category, postId, posts;
    let option, postInfo;

    switch (action.type) {
    case Types.RECEIVE_CATEGORY_POSTS:
        ({ category, posts } = action);
        return {
            ...state,
            [category]: {
                ...state[category],
                posts: reduceToObjectById(posts)
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

