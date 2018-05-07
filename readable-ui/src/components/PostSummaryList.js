import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostSummaryItem from './PostSummaryItem';
import { SORT_BY_DATE, SORT_BY_POINTS } from '../utils/Consts';
import './PostSummaryList.css';

// Map the app state to component props.
const mapStateToProps = (state) => {
    const { sortPostsBy } = state.settings;
    return {
        sortType: sortPostsBy
    };
};

/**
 * Renders a list of user posts, as a vertical column.
 */
class PostSummaryList extends Component {

    static propTypes = {
        /** The user posts to be shown, indexed by post id. */
        posts: PropTypes.object.isRequired
    }

    _toSortCompare(sortType) {
        switch (sortType) {
        case SORT_BY_POINTS:
            return (a, b) => (b.voteScore - a.voteScore);
        case SORT_BY_DATE:
        default:
            return (a, b) => (b.timestamp - a.timestamp);
        }
    }

    render() {
        const { posts, sortType } = this.props;
        const sortCompare = this._toSortCompare(sortType);
        const sortedPosts = Object.values(posts).sort(sortCompare);

        return (
            <div className="rbl-post-summary-list">
                <div className="rbl-post-summary-items">
                    { sortedPosts.map((post) => (
                        <PostSummaryItem key={post.id} post={post} />
                    ))}
                    { (sortedPosts.length === 0) && (
                        <div className="rd-post-summary-item rd-post-summary-none">
                            No posts here!
                        </div>
                    )}
                </div>
            </div>
        );
    };
}

export default connect(mapStateToProps)(PostSummaryList);
