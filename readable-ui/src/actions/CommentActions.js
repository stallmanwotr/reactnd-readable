import * as Types from './Types';
import * as ReadableAPI from '../api/ReadableAPI';

/**
 * Actions related to comments: Add/edit/delete a comment, or vote on
 * a comment.
 */

/** Action Creators */

const createAddComment = (commentInfo) => ({
    type: Types.ADD_COMMENT,
    commentInfo
});

const createEditComment = (commentInfo) => ({
    type: Types.EDIT_COMMENT,
    commentInfo
});

const createDeleteComment = (postId, commentId) => ({
    type: Types.DELETE_COMMENT,
    postId,
    commentId
});

const createVoteOnComment = (commentId, option, postId) => ({
    type: Types.VOTE_ON_COMMENT,
    commentId,
    option,
    postId
});

/** Thunks */

export const addComment = (commentInfo) => dispatch => (
    // first, we add the comment using the commentInfo. then we fetch to get the
    // comment, as this brings in the other fields (voteScore, deleted, etc.).
    ReadableAPI.addComment(commentInfo)
        .then(() =>
            ReadableAPI.getComment(commentInfo.id)
                .then(responseInfo =>
                    dispatch(createAddComment(responseInfo))))
);

export const editComment = (commentId, timestamp, body) => dispatch => (
    // first, we add the comment using the commentInfo. then we fetch to get the
    // comment, as this brings in the other fields (voteScore, deleted, etc.).
    ReadableAPI.editComment(commentId, timestamp, body)
        .then(() =>
            ReadableAPI.getComment(commentId)
                .then(responseInfo =>
                    dispatch(createEditComment(responseInfo))))
);

export const deleteComment = (postId, commentId) => dispatch => (
    ReadableAPI.deleteComment(commentId)
        .then(() =>
            dispatch(createDeleteComment(postId, commentId)))
);

export const voteOnComment = (commentId, option, postId) => dispatch => (
    // (could dispatch action first, so that the UI is updated sooner.)
    ReadableAPI.voteOnComment(commentId, option)
        .then(() =>
            dispatch(createVoteOnComment(commentId, option, postId)))
);

