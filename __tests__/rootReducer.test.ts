import { rootReducer, store } from '../src/services/store';
import { expect, test, describe } from '@jest/globals';

describe('тестирование rootReducer', () => {
  test('тест инициализации rootReducer', () => {
    const initialState = rootReducer(undefined, { type: 'test' });
    expect(initialState).toEqual(store.getState());
  });
});
