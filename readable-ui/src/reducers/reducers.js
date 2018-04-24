import { combineReducers } from 'redux';
import {
    RECEIVE_CATEGORIES
} from '../actions/actions';

const initialState = {
    categories: []
};

// reducers

function food(state = {}, action) {
    console.info('REDUCER: food');
    switch (action.type) {
    /*
    case ADD_RECIPE :
        const { recipe } = action;
        return {
            ...state,
            [recipe.label]: recipe,
        }
    */
    default:
        return state;
    }
}

function categoryReducer(state = initialState, action) {
    console.info('REDUCER: categoryReducer ' + action.type);
    switch (action.type) {
    case RECEIVE_CATEGORIES:
        console.info('Updating state: ' + JSON.stringify(action.categories));
        return {
            ...state,
            categories: action.categories
        };
    default:
        return state;
    }
}

export default combineReducers({
    food,
    categoryReducer,
});
