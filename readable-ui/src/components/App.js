import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage';
import DefaultPage from './pages/DefaultPage';
import PostPage from './pages/PostPage';
import ReadableHeader from './ReadableHeader';

class App extends Component {

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
