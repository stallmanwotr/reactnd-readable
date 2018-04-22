import React, { Component } from 'react';
import * as ReadableAPI from '../api/ReadableAPI';
import PostItem from './PostItem';
import './PostList.css';

/**
 * Renders a list of all posts.
 */
class PostList extends Component {

    state = {
        posts: []
    }

    _fetchPosts() {
        // Example response:
        // [{  
        //     "id":"8xf0y6ziyjabvozdd253nd",
        //     "timestamp":1467166872634,
        //     "title":"Udacity is the best place to learn React",
        //     "body":"Everyone says so after all.",
        //     "author":"thingtwo",
        //     "category":"react",
        //     "voteScore":6,
        //     "deleted":false,
        //     "commentCount":2
        // },
        // ...
        // ]
        ReadableAPI.getPosts().then((response) => {
            const posts = (Array.isArray(response)) ? response : [];
            console.info(`Got ${posts.length} posts.`);
            this.setState({ posts });
        });
    }

    componentDidMount() {
        this._fetchPosts();
    }

    render() {
        const { posts } = this.state;

        return (
            <div className="rbl-post-list">
                <ol className="rbl-posts">
                    { posts.map((post) => (
                        <li key={post.id} className="rbl-post">
                            <PostItem post={post} />
                        </li>
                    ))}
                </ol>
            </div>
        );
    };
}

export default PostList;
