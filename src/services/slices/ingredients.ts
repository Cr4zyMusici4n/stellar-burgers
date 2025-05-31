import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TIngredientState = {
  isLoading: boolean;
  ingredients: TIngredient[];
};

export const initialState: TIngredientState = {
  isLoading: false,
  ingredients: []
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIsLoading: (state) => state.isLoading,
    selectBunIngredients: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'bun'),
    selectMainIngredients: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'main'),
    selectSauceIngredients: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'sauce')
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export default ingredientSlice.reducer;
