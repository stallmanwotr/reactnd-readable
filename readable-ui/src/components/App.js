import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage';
import DefaultPage from './pages/DefaultPage';
import NotFoundPage from './pages/NotFoundPage';
import ErrorBoundary from '../utils/ErrorBoundary.js';
import PostPage from './pages/PostPage';
import ReadableHeader from './ReadableHeader';

class App extends Component {

    render() {
        console.info('App.render ***');

        return (
            <ErrorBoundary componentName="App">
                <div className="rd-app">
                    <ReadableHeader />
                    <Switch>
                        <Route exact path="/" render={() => {
                            console.info('ROUTE /');
                            return (
                                <DefaultPage />
                            );
                        }}/>
                        <Route exact path="/:category" render={({ match }) => {
                            console.info('ROUTE /:category\n' + JSON.stringify(match.params));
                            return (
                                <CategoryPage category={match.params.category} />
                            );
                        }}/>
                        <Route exact path="/:category/:postId" render={({ match }) => {
                            console.info('ROUTE /:category/:postId\n' + JSON.stringify(match.params));
                            return (
                                <PostPage postId={match.params.postId} />
                            );
                        }}/>
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
            </ErrorBoundary>
        );
    };
}

export default App;
