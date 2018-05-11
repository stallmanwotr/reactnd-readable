import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategoryPosts } from '../../actions/CategoryActions';
import NotFoundPage from './NotFoundPage';
import AddPostButton from '../buttons/AddPostButton';
import PageButtonBar from '../buttons/PageButtonBar';
import AddPostDialog from '../dialogs/AddPostDialog';
import PostSummaryList from '../PostSummaryList';
import './CategoryPage.css';

// Map the app state to component props.
const mapStateToProps = ({ all, categories }, ownProps) => {
    const { category } = ownProps;

    const posts = (categories[category]) ? categories[category].posts : {};
    const allCategories = all.categories.map((o) => o.name);

    return { posts, allCategories };
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

    _openAddPostDialog() {
        this.setState(() => ({ addPostDialogOpen: true }));
    }

    _closeAddPostDialog() {
        this.setState(() => ({ addPostDialogOpen: false }));
    }

    render() {
        const { category, posts, allCategories } = this.props;
        const { addPostDialogOpen } = this.state;
        console.info(`Render category: ${category}`);
        console.info(`All categories: ${JSON.stringify(allCategories)}`);

        // if the category is not one of the known ones.
        if (!category || (allCategories.length > 0 && !allCategories.includes(category))) {
            return (
                <NotFoundPage />
            );
        }
        return (
            <div className="rd-category-page">
                <div className="rd-category-header">
                    <div className="rd-category-title">
                        {category}
                    </div>
                    <AddPostButton
                        onAddPost={this._openAddPostDialog.bind(this)} />
                    <PageButtonBar />
                </div>
                <div className="rd-category-posts">
                    <PostSummaryList posts={posts} />
                </div>

                <AddPostDialog
                    category={category}
                    isModalOpen={addPostDialogOpen}
                    onCloseModal={this._closeAddPostDialog.bind(this)}
                />
            </div>
        );
    };
}

export default connect(mapStateToProps)(CategoryPage);
