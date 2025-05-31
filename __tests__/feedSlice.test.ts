import { test, expect, describe } from '@jest/globals';
import feedReducer, {
  fetchFeed,
  initialState
} from '../src/services/slices/feed';

describe('feedReducer pending', () => {
  test('при загрузке isLoading должен быть true', () => {
    const action = { type: fetchFeed.pending.type };
    const nextState = feedReducer(initialState, action);

    expect(nextState.isLoading).toBeTruthy();
    expect(nextState.orders).toEqual(initialState.orders);
    expect(nextState.total).toBe(initialState.total);
    expect(nextState.totalToday).toBe(initialState.totalToday);
  });
});

describe('feedReducer fulfilled', () => {
  test('при выполнение запроса данные сохраняются в состоянии, а isLoading становится false', () => {
    const mockFeed = {
      isLoading: false,
      orders: [
        {
          _id: '683b44b7c2f30c001cb28fb4',
          ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941'],
          status: 'done',
          name: 'Краторный био-марсианский бургер',
          createdAt: '2025-05-31T18:04:39.681Z',
          updatedAt: '2025-05-31T18:04:40.476Z',
          number: 79647
        },
        {
          _id: '683b4419c2f30c001cb28fa0',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0942',
            '643d69a5c3f7b9001cfa0942',
            '643d69a5c3f7b9001cfa0942',
            '643d69a5c3f7b9001cfa0942',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный spicy бургер',
          createdAt: '2025-05-31T18:02:01.392Z',
          updatedAt: '2025-05-31T18:02:02.141Z',
          number: 79646
        }
      ],
      total: 45678,
      totalToday: 123
    };

    const action = {
      type: fetchFeed.fulfilled.type,
      payload: mockFeed
    };
    const nextState = feedReducer(initialState, action);

    expect(nextState.orders).toBe(mockFeed.orders);
    expect(nextState.isLoading).toBe(mockFeed.isLoading);
    expect(nextState.total).toBe(mockFeed.total);
    expect(nextState.totalToday).toBe(mockFeed.totalToday);
  });
});

describe('feedReducer rejected', () => {
  test('при ошибке в запросе isLoading становится false', () => {
    const action = { type: fetchFeed.rejected.type };
    const nextState = feedReducer(initialState, action);

    expect(nextState).toBe(initialState);
  });
});
