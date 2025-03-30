import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TIngredientState = {
  isLoading: boolean;
  ingredients: TIngredient[];
};

const initialState: TIngredientState = {
  isLoading: false,
  ingredients: []
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => await getIngredientsApi()
);

const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIsLoading: (state) => state.isLoading
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
export const { selectIngredients, selectIsLoading } = ingredientSlice.selectors;
