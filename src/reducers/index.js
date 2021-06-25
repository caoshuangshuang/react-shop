import {  combineReducers } from "redux";
import hkReducer from './hkReducer'
import cartReucer from './cartReducer'
import authReducer from './authReducer'

const reducers = combineReducers({
  hk: hkReducer,
  cart:cartReucer,
  auth:authReducer
});

export default reducers