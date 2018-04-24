import PropTypes from 'prop-types';
import React, { Component } from 'react';
import PostList from './PostList';
import './CategoryPage.css';

/**
 * (Routed Page)
 * Shows all posts in a category.
 */
class CategoryPage extends Component {

    static propTypes = {
        category: PropTypes.string.isRequired
    }

    render() {
        const { category } = this.props;
        console.info('*** category: ' + category);

        return (
            <div className="rd-category-page">
                <PostList />
            </div>
        );
    };
}

export default CategoryPage;
