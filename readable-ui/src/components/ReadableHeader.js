import React, { Component } from 'react';
import CategoryList from './CategoryList';
import './ReadableHeader.css';

/**
 * The Readable application header.
 *   It consists of the title and links to all categories.
 */
class ReadableHeader extends Component {
    render() {
        return (
            <div className="rd-header">
                <div className="rd-title">Readable!</div>
                <CategoryList />
            </div>
        );
    };
}

export default ReadableHeader;
