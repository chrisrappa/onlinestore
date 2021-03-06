import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer} from './reducers/productReducers';
import { cartReducer} from './reducers/cartReducers';
import Cookie from 'js-cookie';
import {userRegisterReducer, userSigninReducer, userUpdateReducer} from './reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, myOrderListReducer, orderListReducer, orderDeleteReducer } from './reducers/orderReducers';


const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;


const initialState = {
    cart: { cartItems, shipping: {}, payment: {} },
    userSignin: { userInfo },
  };

const reducer = combineReducers({
    productList: productListReducer, 
    productDetails: productDetailsReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    userUpdate: userUpdateReducer,
    myOrderList: myOrderListReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
})



const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true}) || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;