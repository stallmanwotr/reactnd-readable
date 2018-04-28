import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/actions';
import PostSummaryList from '../PostSummaryList';
import './DefaultPage.css';

// Map the app state to component props.
const mapStateToProps = (state) => {
    const { posts } = state.all;
    return {
        posts
    };
};

/**
 * (Routed Page)
 * The front page: Shows all posts from all categories.
 */
class DefaultPage extends Component {

    componentDidMount() {
        const { dispatch } = this.props;

        // fetch and update the app state.
        dispatch(fetchPosts());
    }

    render() {
        const { posts } = this.props;

        return (
            <div className="rd-default-page">
                { (posts && Array.isArray(posts)) && (
                    <PostSummaryList posts={posts} />
                )}
            </div>
        );
    };
}

export default connect(mapStateToProps)(DefaultPage);
