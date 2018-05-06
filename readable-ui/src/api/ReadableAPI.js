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
 *
 * Example response:
 * [{  
 *     "id":"8xf0y6ziyjabvozdd253nd",
 *     "timestamp":1467166872634,
 *     "title":"Udacity is the best place to learn React",
 *     "body":"Everyone says so after all.",
 *     "author":"thingtwo",
 *     "category":"react",
 *     "voteScore":6,
 *     "deleted":false,
 *     "commentCount":2
 * },
 * ...
 * ]
 */
export const getPosts = () => {
    return doGet('/posts');
};

/**
 * Get the details of a single post.
 *
 * Example JSON:
 * {  
 *    "id":"8xf0y6ziyjabvozdd253nd",
 *    "timestamp":1467166872634,
 *    "title":"Udacity is the best place to learn React",
 *    "body":"Everyone says so after all.",
 *    "author":"thingtwo",
 *    "category":"react",
 *    "voteScore":6,
 *    "deleted":false,
 *    "commentCount":2
 * }
 */
export const getPost = (postId) => {
    return doGet(`/posts/${postId}`);
};

/**
 * Get all the comments for a single post.
 *
 * Example JSON:
 * [{  
 *     "id":"894tuq4ut84ut8v4t8wun89g",
 *     "parentId":"8xf0y6ziyjabvozdd253nd",
 *     "timestamp":1468166872634,
 *     "body":"Hi there! I am a COMMENT.",
 *     "author":"thingtwo",
 *     "voteScore":6,
 *     "deleted":false,
 *     "parentDeleted":false
 * },
 * ...
 * ]
 */
export const getPostComments = (postId) => {
    return doGet(`/posts/${postId}/comments`);
};

/**
 * Get the details for a single comment.
 *
 * Example JSON:
 * {  
 *     "id":"894tuq4ut84ut8v4t8wun89g",
 *     "parentId":"8xf0y6ziyjabvozdd253nd",
 *     "timestamp":1468166872634,
 *     "body":"Hi there! I am a COMMENT.",
 *     "author":"thingtwo",
 *     "voteScore":6,
 *     "deleted":false,
 *     "parentDeleted":false
 * }
 */
export const getComment = (commentId) => {
    return doGet(`/comments/${commentId}`);
};

/**
 * Add a new post.
 *
 * PARAMS:
 *   id - UUID should be fine, but any unique id will work
 *   timestamp - timestamp in whatever format you like, you can use Date.now() if you like
 *   title - String
 *   body - String
 *   author - String
 *   category: Any of the categories listed in categories.js.
 */
export const addPost = (postInfo) => {
    return doPost('/posts', postInfo);
};

/**
 * Deletes a post.
 *
 * Sets the deleted flag for a post to 'true'.
 * Sets the parentDeleted flag for all child comments to 'true'.
 */
export const deletePost = (postId) => {
    return doDelete(`/posts/${postId}`);
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
 *
 * PARAMS:
 *   id: Any unique ID. As with posts, UUID is probably the best here.
 *   timestamp: timestamp. Get this however you want.
 *   body: String
 *   author: String
 *   parentId: Should match a post id in the database.
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

