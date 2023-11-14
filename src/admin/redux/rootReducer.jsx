import { combineReducers } from 'redux';
import clubReducer from './reducers/clubReducer';
import leagueReducer from './reducers/leagueReducer';
import commonReducer from './reducers/commonReducer';
import brandReducer from './reducers/brandReducer';
import productReducer from './reducers/productReducer';
import voucherReducer from './reducers/voucherReducer';
import paymentReducer from './reducers/paymentReducer';
import sizeReducer from './reducers/sizeReducer';
import accountReducer from './reducers/accountReducer';
import orderReducer from './reducers/orderReducer';
const rootReducer = combineReducers({
    clubReducer,
    leagueReducer,
    commonReducer,
    brandReducer,
    productReducer,
    voucherReducer,
    paymentReducer,
    sizeReducer,
    accountReducer,
    orderReducer,
});

export default rootReducer;
