import { combineReducers } from 'redux';
import clubReducer from './reducers/clubReducer';
import commonReducer from './reducers/commonReducer';
import brandReducer from './reducers/brandReducer';
import productReducer from './reducers/productReducer';
const rootReducer = combineReducers({
    clubReducer,
    commonReducer,
    brandReducer,
    productReducer,
});

export default rootReducer;
