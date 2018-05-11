import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/PostActions';
import AddPostButton from '../buttons/AddPostButton';
import PostSummaryList from '../PostSummaryList';
import PageButtonBar from '../buttons/PageButtonBar';
import AddPostDialog from '../dialogs/AddPostDialog';
import './DefaultPage.css';

// Map the app state to component props.
const mapStateToProps = ({ all }) => {
    const { posts } = all;
    return {
        posts
    };
};

/**
 * (Routed Page)
 * The front page: Shows all posts from all categories.
 */
class DefaultPage extends Component {

    state = {
        addPostDialogOpen: false
    }

    componentDidMount() {
        const { dispatch } = this.props;
        // fetch all posts and update the app state.
        dispatch(fetchPosts());
    }

    _openAddPostDialog() {
        this.setState(() => ({ addPostDialogOpen: true }));
    }

    _closeAddPostDialog() {
        this.setState(() => ({ addPostDialogOpen: false }));
    }

    render() {
        const { posts } = this.props;
        const { addPostDialogOpen } = this.state;

        return (
            <div className="rd-default-page">
                <div className="rd-category-header">
                    <div className="rd-category-title">
                        all
                    </div>
                    <AddPostButton
                        onAddPost={this._openAddPostDialog.bind(this)} />
                    <PageButtonBar />
                </div>
                <div className="rd-default-posts">
                    { (posts) && (
                        <PostSummaryList posts={posts} />
                    )}
                </div>

                <AddPostDialog
                    isModalOpen={addPostDialogOpen}
                    onCloseModal={this._closeAddPostDialog.bind(this)}
                />
            </div>
        );
    };
}

export default connect(mapStateToProps)(DefaultPage);
