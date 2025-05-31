import { describe, test, expect } from '@jest/globals';
import orderReducer, {
  fetchOrders,
  sendOrder,
  fetchOrderByNumber,
  initialState
} from '../src/services/slices/order';

describe('тесты для orderReducer', () => {
  describe('fetchOrders pending', () => {
    test('при загрузке isLoading должен быть true', () => {
      const action = { type: fetchOrders.pending.type };
      const nextState = orderReducer(initialState, action);

      expect(nextState.isLoading).toBeTruthy();
      expect(nextState.data).toBe(initialState.data);
      expect(nextState.orderModalData).toBe(initialState.orderModalData);
      expect(nextState.orderRequest).toBe(initialState.orderRequest);
      expect(nextState.singleOrder).toBe(initialState.singleOrder);
    });
  });

  describe('fetchOrders fulfilled', () => {
    test('при выполнение запроса данные сохраняются в состоянии, а isLoading становится false', () => {
      const mockOrder = [
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
          _id: '683a9ba7c2f30c001cb28ca5',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa0942',
            '643d69a5c3f7b9001cfa093c'
          ],
          status: 'done',
          name: 'Краторный spicy био-марсианский бургер',
          createdAt: '2025-05-31T06:03:19.781Z',
          updatedAt: '2025-05-31T06:03:20.528Z',
          number: 79575
        }
      ];

      const action = {
        type: fetchOrders.fulfilled.type,
        payload: mockOrder
      };
      const nextState = orderReducer(initialState, action);

      expect(nextState.isLoading).toBe(initialState.isLoading);
      expect(nextState.data).toBe(mockOrder);
      expect(nextState.orderModalData).toBe(initialState.orderModalData);
      expect(nextState.orderRequest).toBe(initialState.orderRequest);
      expect(nextState.singleOrder).toBe(initialState.singleOrder);
    });
  });

  describe('fetchOrders rejected', () => {
    test('при ошибке в запросе isLoading становится false', () => {
      const action = { type: fetchOrders.rejected.type };
      const nextState = orderReducer(initialState, action);

      expect(nextState).toBe(initialState);
    });
  });

  describe('sendOrder pending', () => {
    test('при загрузке isLoading должен быть true', () => {
      const action = { type: sendOrder.pending.type };
      const nextState = orderReducer(initialState, action);

      expect(nextState.isLoading).toBeTruthy();
      expect(nextState.data).toBe(initialState.data);
      expect(nextState.orderModalData).toBe(initialState.orderModalData);
      expect(nextState.orderRequest).toBeTruthy();
      expect(nextState.singleOrder).toBe(initialState.singleOrder);
    });
  });

  describe('sendOrder fulfilled', () => {
    test('при выполнение запроса данные сохраняются в состоянии, а isLoading становится false', () => {
      const mockOrder = [
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
          _id: '683a9ba7c2f30c001cb28ca5',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa0942',
            '643d69a5c3f7b9001cfa093c'
          ],
          status: 'done',
          name: 'Краторный spicy био-марсианский бургер',
          createdAt: '2025-05-31T06:03:19.781Z',
          updatedAt: '2025-05-31T06:03:20.528Z',
          number: 79575
        }
      ];

      const action = {
        type: sendOrder.fulfilled.type,
        payload: { order: mockOrder }
      };
      const nextState = orderReducer(initialState, action);

      expect(nextState.isLoading).toBe(false);
      expect(nextState.orderRequest).toBe(false);
      expect(nextState.orderModalData).toEqual(mockOrder);
      expect(nextState.data).toEqual([mockOrder]);
      expect(nextState.singleOrder).toBe(initialState.singleOrder);
    });
  });

  describe('sendOrder rejected', () => {
    test('при ошибке в запросе isLoading становится false', () => {
      const action = { type: sendOrder.rejected.type };
      const nextState = orderReducer(initialState, action);

      expect(nextState).toBe(initialState);
    });
  });

  describe('fetchOrderByNumber pending', () => {
    test('при загрузке isLoading должен быть true', () => {
      const action = { type: fetchOrderByNumber.pending.type };
      const nextState = orderReducer(initialState, action);

      expect(nextState.isLoading).toBeTruthy();
      expect(nextState.data).toBe(initialState.data);
      expect(nextState.orderModalData).toBe(initialState.orderModalData);
      expect(nextState.orderRequest).toBe(initialState.orderRequest);
      expect(nextState.singleOrder).toBe(initialState.singleOrder);
    });
  });

  describe('fetchOrderByNumber fulfilled', () => {
    test('при выполнение запроса данные сохраняются в состоянии, а isLoading становится false', () => {
      const mockOrder = {
        _id: '683b44b7c2f30c001cb28fb4',
        ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941'],
        status: 'done',
        name: 'Краторный био-марсианский бургер',
        createdAt: '2025-05-31T18:04:39.681Z',
        updatedAt: '2025-05-31T18:04:40.476Z',
        number: 79647
      };

      const action = {
        type: fetchOrderByNumber.fulfilled.type,
        payload: mockOrder
      };
      const nextState = orderReducer(initialState, action);

      expect(nextState.isLoading).toBe(false);
      expect(nextState.data).toEqual(initialState.data);
      expect(nextState.orderModalData).toBe(initialState.orderModalData);
      expect(nextState.orderRequest).toBe(initialState.orderRequest);
      expect(nextState.singleOrder).toEqual(mockOrder);
    });
  });

  describe('fetchOrderByNumber rejected', () => {
    test('при ошибке в запросе isLoading становится false', () => {
      const action = { type: fetchOrderByNumber.rejected.type };
      const nextState = orderReducer(initialState, action);

      expect(nextState).toBe(initialState);
    });
  });
});
