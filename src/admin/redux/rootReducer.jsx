import { combineReducers } from 'redux';
import clubReducer from './reducers/clubReducer';
import commonReducer from './reducers/commonReducer';

const rootReducer = combineReducers({
    clubReducer,
    commonReducer,
});

export default rootReducer;
