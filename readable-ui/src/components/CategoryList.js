import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../actions/CategoryActions';
import './CategoryList.css';

// Redux: Map the app state to component props.
const mapStateToProps = ({ all }) => {
    const { categories } = all;
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

        // fetch and update the app state.
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
