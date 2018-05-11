import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deletePost } from '../actions/PostActions';
import PostSummaryItem from './PostSummaryItem';
import AddPostDialog from './dialogs/AddPostDialog';
import { SORT_BY_DATE, SORT_BY_POINTS } from '../utils/Consts';
import './PostSummaryList.css';

// Map the app state to component props.
const mapStateToProps = ({ settings }) => {
    return {
        sortType: settings.sortPostsBy
    };
};

/**
 * Renders a list of user posts, as a vertical column.
 */
class PostSummaryList extends Component {

    static propTypes = {
        /** The user posts to be shown, indexed by post id. */
        posts: PropTypes.object.isRequired
    }

    state = {
        /** Set when the edit dialog is open for a post. */
        postToEdit: undefined
    }

    _openEditPostDialog(post) {
        this.setState(() => ({
            postToEdit: post
        }));
    }

    _closeEditPostDialog() {
        this.setState(() => ({
            postToEdit: undefined
        }));
    }

    _deletePost(post) {
        const { dispatch } = this.props;
        dispatch(deletePost(post.id, post.category));
    }

    _toSortCompare(sortType) {
        switch (sortType) {
        case SORT_BY_POINTS:
            return (a, b) => (b.voteScore - a.voteScore);
        case SORT_BY_DATE:
        default:
            return (a, b) => (b.timestamp - a.timestamp);
        }
    }

    render() {
        const { posts, sortType } = this.props;
        const { postToEdit } = this.state;

        const sortCompare = this._toSortCompare(sortType);
        const sortedPosts = Object.values(posts).sort(sortCompare)
            .filter((p) => p.deleted === false);

        return (
            <div className="rbl-post-summary-list">
                <div className="rbl-post-summary-items">
                    { sortedPosts
                        .map((post) => (
                            <PostSummaryItem key={post.id} post={post}
                                onEditPost={() => this._openEditPostDialog(post)}
                                onDeletePost={() => this._deletePost(post)} />
                        ))}
                    { (sortedPosts.length === 0) && (
                        <div className="rd-post-summary-item rd-post-summary-none">
                            No posts here!
                        </div>
                    )}
                </div>

                <AddPostDialog
                    postToEdit={postToEdit}
                    category={(postToEdit) ? postToEdit.category : undefined}
                    isModalOpen={(typeof postToEdit !== 'undefined')}
                    onCloseModal={this._closeEditPostDialog.bind(this)}
                />
            </div>
        );
    };
}

export default connect(mapStateToProps)(PostSummaryList);
