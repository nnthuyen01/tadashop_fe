import { combineReducers } from 'redux';
import clubReducer from './reducers/clubReducer';
import commonReducer from './reducers/commonReducer';
import brandReducer from './reducers/brandReducer';
import productReducer from './reducers/productReducer';
import voucherReducer from './reducers/voucherReducer';
import paymentReducer from './reducers/paymentReducer';
import sizeReducer from './reducers/sizeReducer';
const rootReducer = combineReducers({
    clubReducer,
    commonReducer,
    brandReducer,
    productReducer,
    voucherReducer,
    paymentReducer,
    sizeReducer,
});

export default rootReducer;
