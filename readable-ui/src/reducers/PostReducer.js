import * as Types from '../actions/Types';
import { UP_VOTE } from '../utils/Consts';
import { reduceToObjectById } from '../utils/Utils';

/**
 * The 'postReducer' handles individual posts and their comments. It loosely
 * corresponds to the 'post' pages.
 */
export function postReducer(state = {}, action) {
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
                comments: reduceToObjectById(comments)
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

