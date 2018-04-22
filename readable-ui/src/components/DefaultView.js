import React, { Component } from 'react';
import CategoryList from './CategoryList';
import PostList from './PostList';
import './DefaultView.css';

/**
 * The top-level view shows all posts from all categories.
 */
class DefaultView extends Component {

    render() {
        return (
            <div className="rbl-default-view">
                <div className="rbl-header">
                    <div className="rbl-title">Readable!</div>
                    <CategoryList />
                </div>
                <PostList />
                <div className="rbl-placeholder">&nbsp;</div>
            </div>
        );
    };
}

export default DefaultView;
