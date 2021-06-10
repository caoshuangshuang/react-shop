import {  combineReducers } from "redux";
import hkReducer from './hkReducer'

const reducers = combineReducers({
  hk: hkReducer,
});

export default reducers