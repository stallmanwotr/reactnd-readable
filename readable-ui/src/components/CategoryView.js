import CategoryList from './CategoryList';
import PostList from './PostList';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './CategoryView.css';

/**
 * Shows all posts in a category.
 */
class CategoryView extends Component {

    static propTypes = {
        category: PropTypes.string.isRequired
    }

    render() {
        const { category } = this.props;
        console.info('*** ' + JSON.stringify(this.props));
        console.info('*** ' + this.props.path);

        return (
            <div className="rbl-category-view">
                <div className="rbl-header">
                    <div className="rbl-title">Readable: {category}!</div>
                    <CategoryList />
                </div>
                <PostList />
            </div>
        );
    };
}

export default CategoryView;
