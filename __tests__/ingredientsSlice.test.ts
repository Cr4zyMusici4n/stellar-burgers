import { describe, test, expect } from '@jest/globals';
import ingredientReducer, {
  fetchIngredients,
  initialState
} from '../src/services/slices/ingredients';

describe('ingredientReducer pending', () => {
  test('при загрузке isLoading должен быть true', () => {
    const action = { type: fetchIngredients.pending.type };
    const nextState = ingredientReducer(initialState, action);

    expect(nextState.isLoading).toBe(true);
    expect(nextState.ingredients).toEqual([]);
  });
});

describe('ingredientReducer fulfilled', () => {
  test('при выполнение запроса данные сохраняются в состоянии, а isLoading становится false', () => {
    const mockIngredients = [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      }
    ];

    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const nextState = ingredientReducer(initialState, action);

    expect(nextState.ingredients).toEqual(mockIngredients);
    expect(nextState.isLoading).toBe(false);
  });
});

describe('ingredientReducer rejected', () => {
  test('при ошибке в запросе isLoading становится false', () => {
    const action = { type: fetchIngredients.rejected.type };
    const nextState = ingredientReducer(initialState, action);

    expect(nextState.isLoading).toBe(false);
    expect(nextState.ingredients).toEqual([]);
  });
});
