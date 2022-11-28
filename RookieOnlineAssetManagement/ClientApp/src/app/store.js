import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import homeReducer from '../pages/Home/HomeSlice'

const rootReducer = {
	home: homeReducer,
	// user: userReducer
}

const store = configureStore({
	reducer: rootReducer
});

export default store;