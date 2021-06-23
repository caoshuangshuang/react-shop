import {  combineReducers } from "redux";
import hkReducer from './hkReducer'
import cartReucer from './cartReducer'

const reducers = combineReducers({
  hk: hkReducer,
  cart:cartReucer
});

export default reducers