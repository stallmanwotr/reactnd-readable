import * as Types from '../actions/Types';
import { SORT_BY_DATE } from '../utils/Consts';

const initialSettingsState = {
    sortPostsBy: SORT_BY_DATE
};

/**
 * This reducer keeps track of general application settings, such as the
 * preferred sort order.
 */
export function settingsReducer(state = initialSettingsState, action) {
    switch (action.type) {
    case Types.SORT_POSTS_BY:
        const { sortOrder } = action;
        return {
            ...state,
            sortPostsBy: sortOrder
        };

    default:
        return state;
    }
}

