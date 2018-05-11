import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PageButton.css';

// Map the app state to component props.
const mapStateToProps = ({ all }) => {
    const { categories } = all;
    return {
        categories
    };
};

/**
 * Menu for choosing the sort order (by date, point count).
 */
class CategoryMenu extends Component {

    static propTypes = {
        /** The initial & currently selected category. */
        selectedCategory: PropTypes.string.isRequired,

        /** Handlers: When the user selects a category. */
        onCategorySelected: PropTypes.func
    }

    render() {
        const { categories, selectedCategory } = this.props;
        const { onCategorySelected } = this.props;

        return (
            <div className="rd-page-menu rd-category-menu">
                <div className="rd-page-button rd-category-button">
                    Category: {selectedCategory}
                </div>
                <div className="rd-page-container">
                    <div className="rd-page-menu-items">
                        {categories.map((category) => (
                            <div key={category.name} className="rd-page-menu-item"
                                onClick={() => { if (onCategorySelected) {
                                    onCategorySelected(category.name); }}} >
                                {category.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };
}

export default connect(mapStateToProps)(CategoryMenu);
