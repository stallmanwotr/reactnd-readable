import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sortPostsBy } from '../../actions/PostActions';
import * as Consts from '../../utils/Consts';
import './PageButton.css';

// Map the app state to component props.
const mapStateToProps = (state) => {
    const { sortPostsBy } = state.settings;
    return {
        sortType: sortPostsBy
    };
};

/**
 * Menu for choosing the sort order (by date, point count).
 */
class SortByMenu extends Component {

    _setSortType(sortType) {
        const { dispatch } = this.props;
        dispatch(sortPostsBy(sortType));
    }

    render() {
        const { sortType } = this.props;

        return (
            <div className="rd-sort-by-menu rd-page-menu">
                <div className="rd-page-button">
                    Sort by: {sortType}
                </div>
                <div className="rd-page-container">
                    <div className="rd-page-menu-items">
                        <div className="rd-page-menu-item"
                            onClick={() => this._setSortType(Consts.SORT_BY_DATE)} >
                            Date</div>
                        <div className="rd-page-menu-item"
                            onClick={() => this._setSortType(Consts.SORT_BY_POINTS)} >
                            Points</div>
                    </div>
                </div>
            </div>
        );
    };
}

export default connect(mapStateToProps)(SortByMenu);
