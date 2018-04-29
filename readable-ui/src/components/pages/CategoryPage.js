import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategoryPosts } from '../../actions/actions';
import AddPostButton from '../AddPostButton';
import AddPostDialog from '../dialogs/AddPostDialog';
import PostSummaryList from '../PostSummaryList';
import './CategoryPage.css';

// Map the app state to component props.
const mapStateToProps = (state, ownProps) => {
    const { category } = ownProps;

    const posts = (state.categories[category])
        ? state.categories[category].posts : {};

    return { posts };
};

/**
 * (Routed Page)
 * Shows all user posts for an individual category.
 */
class CategoryPage extends Component {

    static propTypes = {
        /** The specific category for this page. */
        category: PropTypes.string.isRequired
    }

    state = {
        addPostDialogOpen: false
    }

    componentDidMount() {
        const { category, dispatch } = this.props;

        // initial: fetch and update the app state.
        console.info('Fetching posts for category (init): ' + category);
        dispatch(fetchCategoryPosts(category));
    }

    componentWillReceiveProps(nextProps) {
        const { category, dispatch } = this.props;
        const nextCategory = nextProps.category;

        // if a different category is selected (routed).
        if (nextCategory !== category) {
            console.info('Fetching posts for category (next): ' + category);
            dispatch(fetchCategoryPosts(nextCategory));
        }
    }

    openAddPostDialog() {
        console.info('openAddPostDialog ****');
        this.setState(() => ({ addPostDialogOpen: true }));
    }

    closeAddPostDialog() {
        console.info('closeAddPostDialog ****');
        this.setState(() => ({ addPostDialogOpen: false }));
    }

    _onAddPostButton() {
        console.info('Launching: Add Post Dialog');
        this.openAddPostDialog();
    }

    render() {
        const { category, posts } = this.props;
        const { addPostDialogOpen } = this.state;
        console.info('Render category: ' + category);

        return (
            <div className="rd-category-page">
                <div className="rd-category-header">
                    <div className="rd-category-title">
                        {category}
                    </div>
                    <AddPostButton
                        onAddPost={this._onAddPostButton.bind(this)} />
                </div>
                <div className="rd-category-posts">
                    <PostSummaryList posts={posts} />
                </div>

                <AddPostDialog
                    isModalOpen={addPostDialogOpen}
                    onAddButton={this.closeAddPostDialog.bind(this)}
                    onCancelButton={this.closeAddPostDialog.bind(this)}
                />
            </div>
        );
    };
}

export default connect(mapStateToProps)(CategoryPage);
