import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as ReadableAPI from '../api/ReadableAPI';
import './CategoryList.css';

/**
 * Renders a list of all categories.
 *
 * Example JSON:
 * {
 *    "categories": [{
 *        "name": "react",
 *        "path":"react"
 *    },
 *    ...
 *    ]
 * }
 */
class CategoryList extends Component {

    state = {
        categories: []
    }

    _fetchCategories() {
        ReadableAPI.getCategories().then((response) => {
            const categories = (response && response.categories) ? response.categories : [];
            console.info(`Got ${categories.length} categories.`);
            this.setState({ categories });
        });
    }

    componentDidMount() {
        this._fetchCategories();
    }

    render() {
        const { categories } = this.state;

        return (
            <div className="rbl-categories">
                <div key={'all'} className="rbl-category">
                    <Link to={'/'}>all</Link>
                </div>
                { categories.map((category) => (
                    <div key={category.name} className="rbl-category">
                        <Link to={'/' + category.path}>{category.name}</Link>
                    </div>
                ))}
            </div>
        );
    };
}

export default CategoryList;
