import { feedSlice } from '../slices/feed';
import { ingredientSlice } from '../slices/ingredients';
import { orderSlice } from '../slices/order';
import { userSlice } from '../slices/user';

export const {
  selectIngredients,
  selectIsLoading,
  selectBunIngredients,
  selectMainIngredients,
  selectSauceIngredients
} = ingredientSlice.selectors;

export const {
  getOrderModalData,
  getAllOrders,
  getIsLoading,
  getOrderRequest,
  getSingleOrder
} = orderSlice.selectors;

export const { selectFeedOrders, selectFeedInfo } = feedSlice.selectors;

export const { selectIsAuth, selectError, selectUser } = userSlice.selectors;
