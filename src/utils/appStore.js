import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import itemCountReducer from "./itemCountSlice";
import loadingReducer from "./loadingSlice";

const rootReducer = combineReducers({
    user: userReducer,
    itemCount: itemCountReducer,
    loading: loadingReducer 
  });

const store = configureStore({
  reducer: rootReducer,
});

export default store;
