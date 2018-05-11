import { combineReducers } from 'redux';
import { allReducer } from './AllReducer';
import { categoryReducer } from './CategoryReducer';
import { postReducer } from './PostReducer';
import { settingsReducer } from './SettingsReducer';

/**
 * The root reducer for the application.
 */
export default combineReducers({
    all: allReducer,
    categories: categoryReducer,
    posts: postReducer,
    settings: settingsReducer
});
