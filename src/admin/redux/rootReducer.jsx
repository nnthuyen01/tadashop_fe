import { combineReducers } from 'redux';
import clubReducer from './reducers/clubReducer';
import commonReducer from './reducers/commonReducer';
import brandReducer from './reducers/brandReducer';
const rootReducer = combineReducers({
    clubReducer,
    commonReducer,
    brandReducer,
});

export default rootReducer;
