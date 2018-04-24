import React, { Component } from 'react';
import PostList from './PostList';
import './DefaultPage.css';

/**
 * (Routed Page)
 * Shows all posts from all categories.
 */
class DefaultPage extends Component {

    render() {
        return (
            <div className="rd-default-page">
                <PostList />
            </div>
        );
    };
}

export default DefaultPage;
