import PropTypes from 'prop-types';
import React, { Component } from 'react';
import PostSummaryItem from './PostSummaryItem';
import './PostSummaryList.css';

/**
 * Renders a list of user posts, as a vertical column.
 */
class PostSummaryList extends Component {

    static propTypes = {
        /** The user posts to be shown, indexed by post id. */
        posts: PropTypes.object.isRequired
    }

    render() {
        const { posts } = this.props;
        const sortedPosts = Object.values(posts).sort(
            (a, b) => (a.timestamp - b.timestamp));

        return (
            <div className="rbl-post-summary-list">
                { sortedPosts.map((post) => (
                    <PostSummaryItem key={post.id} post={post} />
                ))}
                { (sortedPosts.length === 0) && (
                    <div className="rd-post-summary-none">
                        No posts here!
                    </div>
                )}
            </div>
        );
    };
}

export default PostSummaryList;
