import { combineReducers, configureStore } from '@reduxjs/toolkit';

import ingredientSliceReducer from './slices/ingredients';
import constructorSliceReducer from './slices/constructor';
import orderSliceReducer from './slices/order';
import userSliceReducer from './slices/user';
import feedSliceReducer from './slices/feed';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: ingredientSliceReducer,
  burgerConstructor: constructorSliceReducer,
  order: orderSliceReducer,
  user: userSliceReducer,
  feed: feedSliceReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
