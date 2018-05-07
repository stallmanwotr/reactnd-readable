import React, { Component } from 'react';
import SortByMenu from './SortByMenu';
import './PageButton.css';

/**
 * Button bar at the top of the post/category pages.
 */
class PageButtonBar extends Component {

    render() {
        return (
            <div className="rd-page-button-bar">
                <SortByMenu />
            </div>
        );
    };
}

export default PageButtonBar;
