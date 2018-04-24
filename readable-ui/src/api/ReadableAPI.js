import { doGet, doPost, doPut, doDelete } from './RestUtil';

/**
 * Get all of the categories available for the app.
 *
 * Example JSON:
 * {
 *    "categories": [{
 *        "name": "react",
 *        "path":"react"
 *    },
 *    ...
 *    ]
 * }
 */
export const getCategories = () => {
    return doGet('/categories');
};

/**
 * Get all of the posts for a particular category.
 */
export const getCategoryPosts = (category) => {
    return doGet(`/${category}/posts`);
};

/**
 * Get all of the posts.
 */
export const getPosts = () => {
    return doGet('/posts');
};

/**
 * Get the details of a single post.
 */
export const getPost = (postId) => {
    return doGet(`/posts/${postId}`);
};

/**
 * Get all the comments for a single post.
 */
export const getPostComments = (postId) => {
    return doGet(`/posts/${postId}/comments`);
};

/**
 * Get the details for a single comment.
 */
export const getComment = (commentId) => {
    return doGet(`/comments/${commentId}`);
};

/**
 * Add a new post.
 */
export const addPost = (postInfo) => {
    return doPost('/posts', postInfo);
};

/**
 * Used for voting on a post.
 *
 * @param option {String} Either "upVote" or "downVote".
 */
export const voteOnPost = (postId, option) => {
    return doPost(`/posts/${postId}`, { option });
};

/**
 * Add a comment to a post.
 */
export const addComment = (commentInfo) => {
    return doPost('/comments', commentInfo);
};

/**
 * Used for voting on a comment.
 *
 * @param option {String} Either "upVote" or "downVote".
 */
export const voteOnComment = (commentId, option) => {
    return doPost(`/comments/${commentId}`, { option });
};

/**
 * Edit the details of an existing post.
 */
export const editPost = (postId, title, body) => {
    return doPut(`/posts/${postId}`, { title, body });
};

/**
 * Edit the details of an existing comment.
 */
export const editComment = (commentId, timestamp, body) => {
    return doPut(`/comments/${commentId}`, { timestamp, body });
};

/**
 * Sets a comment's deleted flag to 'true'
 */
export const deleteComment = (commentId) => {
    return doDelete(`/comments/${commentId}`);
};

