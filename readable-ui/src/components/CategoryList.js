import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../actions/actions';
import './CategoryList.css';

// Map the app state to component props.
const mapStateToProps = (state) => {
    const { categories } = state.categoryReducer;
    return {
        categories
    };
};

/**
 * Lists all categories, that link to the category pages.
 */
class CategoryList extends Component {

    componentDidMount() {
        const { dispatch } = this.props;

        // fetch from the backend and update the app state.
        dispatch(fetchCategories());
    }

    render() {
        const { categories } = this.props;

        if (!Array.isArray(categories)) {
            return (null);
        }
        return (
            <div className="rd-categories">
                <div key={'all'} className="rd-category">
                    <Link to={'/'}>all</Link>
                </div>
                { categories.map((category) => (
                    <div key={category.name} className="rd-category">
                        <Link to={'/' + category.path}>{category.name}</Link>
                    </div>
                ))}
            </div>
        );
    };
}

export default connect(mapStateToProps)(CategoryList);
