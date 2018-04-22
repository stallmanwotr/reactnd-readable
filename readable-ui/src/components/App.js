import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as ReadableAPI from '../api/ReadableAPI';
import DefaultView from './DefaultView';
import CategoryView from './CategoryView';

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
                <Route exact path="/" render={() => (
                    <DefaultView />
                )}/>
                <Route path="/:category" render={({ match }) => (
                    <CategoryView category={match.params.category} />
                )}/>
            </div>
        );
    };
}

export default App;
