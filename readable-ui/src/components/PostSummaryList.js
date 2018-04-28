import PropTypes from 'prop-types';
import React, { Component } from 'react';
import PostSummaryItem from './PostSummaryItem';
import './PostSummaryList.css';

/**
 * Renders a list of user posts, as a vertical column.
 */
class PostSummaryList extends Component {

    static propTypes = {
        /** The user posts to be shown. */
        posts: PropTypes.array.isRequired
    }

    render() {
        const { posts } = this.props;
        console.info('Render post summaries ****');

        return (
            <div className="rbl-post-summary-list">
                { posts.map((post) => (
                    <PostSummaryItem key={post.id} post={post} />
                ))}
                { (posts.length === 0) && (
                    <div className="rd-post-summary-none">
                        No posts here!
                    </div>
                )}
            </div>
        );
    };
}

export default PostSummaryList;
