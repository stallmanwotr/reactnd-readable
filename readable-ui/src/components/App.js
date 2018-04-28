import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CategoryPage from './pages/CategoryPage';
import DefaultPage from './pages/DefaultPage';
import PostPage from './pages/PostPage';
import ReadableHeader from './ReadableHeader';
import * as ReadableAPI from '../api/ReadableAPI';

class App extends Component {

    _fetchContent() {
        /*
        ReadableAPI.getCategories().then((categories) => {
            console.info('Got the categories: \n' + JSON.stringify(categories));
        });
        */
        ReadableAPI.getCategoryPosts('react').then((posts) => {
            console.info('Got the category posts: \n' + JSON.stringify(posts));
        });

        ReadableAPI.getPosts().then((posts) => {
            console.info('Got posts: \n' + JSON.stringify(posts));
        });
    }

    componentDidMount() {
        this._fetchContent();
    }

    render() {
        return (
            <div>
                <ReadableHeader />
                <Route exact path="/" render={() => (
                    <DefaultPage />
                )}/>
                <Route exact path="/:category" render={({ match }) => (
                    <CategoryPage category={match.params.category} />
                )}/>
                <Route exact path="/:category/:postId" render={({ match }) => (
                    <PostPage postId={match.params.postId} />
                )}/>
            </div>
        );
    };
}

export default App;
