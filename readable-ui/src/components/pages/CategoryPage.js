import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategoryPosts } from '../../actions/actions';
import PostSummaryList from '../PostSummaryList';
import './CategoryPage.css';

// Map the app state to component props.
const mapStateToProps = (state, ownProps) => {
    const { category } = ownProps;
    const posts = (state.categories && state.categories[category])
        ? state.categories[category].posts : [];

    return { posts };
};

/**
 * (Routed Page)
 * Shows all user posts for an individual category.
 */
class CategoryPage extends Component {

    static propTypes = {
        /** The specific category for this page. */
        category: PropTypes.string.isRequired
    }

    componentDidMount() {
        const { category, dispatch } = this.props;

        // initial: fetch and update the app state.
        console.info('Fetching posts for category (init): ' + category);
        dispatch(fetchCategoryPosts(category));
    }

    componentWillReceiveProps(nextProps) {
        const { category, dispatch } = this.props;
        const nextCategory = nextProps.category;

        // if a different category is selected (routed).
        if (nextCategory !== category) {
            console.info('Fetching posts for category (next): ' + category);
            dispatch(fetchCategoryPosts(nextCategory));
        }
    }

    render() {
        const { category, posts } = this.props;
        console.info('Render category: ' + category);

        return (
            <div className="rd-category-page" >
                <PostSummaryList posts={posts} />
            </div>
        );
    };
}

export default connect(mapStateToProps)(CategoryPage);
