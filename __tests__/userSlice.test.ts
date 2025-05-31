import { describe, test, expect } from '@jest/globals';
import userReducer, {
  initialState,
  fetchUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from '../src/services/slices/user';

describe('тесты для userReducer', () => {
  describe('fetchUser pending', () => {
    test('при загрузке isLoading должен быть true', () => {
      const action = { type: fetchUser.pending.type };
      const nextState = userReducer(initialState, action);

      expect(nextState.isLoading).toBeTruthy();
      expect(nextState.data).toBe(initialState.data);
      expect(nextState.isAuth).toBe(initialState.isAuth);
      expect(nextState.error).toBe('');
    });
  });

  describe('fetchUser fulfilled', () => {
    test('при выполнение запроса данные сохраняются в состоянии, а isLoading становится false', () => {
      const mockUser = {
        email: 'test@test.ru',
        name: 'Test'
      };

      const action = {
        type: fetchUser.fulfilled.type,
        payload: mockUser
      };
      const nextState = userReducer(initialState, action);

      expect(nextState.isLoading).toBe(initialState.isLoading);
      expect(nextState.data).toBe(mockUser);
      expect(nextState.isAuth).toBeTruthy();
      expect(nextState.error).toBe(initialState.error);
    });
  });

  describe('fetchUser rejected', () => {
    test('при ошибке в запросе isLoading становится false', () => {
      const action = { type: fetchUser.rejected.type };
      const nextState = userReducer(initialState, action);

      expect(nextState).toBe(initialState);
    });
  });

  describe('loginUser pending', () => {
    test('при загрузке isLoading должен быть true', () => {
      const action = { type: loginUser.pending.type };
      const nextState = userReducer(initialState, action);

      expect(nextState.isLoading).toBeTruthy();
      expect(nextState.data).toBe(initialState.data);
      expect(nextState.isAuth).toBe(initialState.isAuth);
      expect(nextState.error).toBe('');
    });
  });

  describe('loginUser fulfilled', () => {
    test('при выполнение запроса данные сохраняются в состоянии, а isLoading становится false', () => {
      const mockUser = {
        email: 'test@test.ru',
        name: 'Test'
      };

      const action = {
        type: loginUser.fulfilled.type,
        payload: { user: mockUser }
      };
      const nextState = userReducer(initialState, action);

      expect(nextState.isLoading).toBe(initialState.isLoading);
      expect(nextState.data).toBe(mockUser);
      expect(nextState.isAuth).toBeTruthy();
      expect(nextState.error).toBe(initialState.error);
    });
  });

  describe('loginUser rejected', () => {
    test('при ошибке в запросе isLoading становится false', () => {
      const errorMessage = 'Invalid credentials';

      const action = {
        type: loginUser.rejected.type,
        error: { message: errorMessage }
      };
      const nextState = userReducer(initialState, action);

      expect(nextState.isLoading).toBe(false);
      expect(nextState.data).toBe(initialState.data);
      expect(nextState.isAuth).toBe(initialState.isAuth);
      expect(nextState.error).toBe(errorMessage);
    });
  });

  describe('logoutUser pending', () => {
    test('при загрузке isLoading должен быть true', () => {
      const action = { type: logoutUser.pending.type };
      const nextState = userReducer(initialState, action);

      expect(nextState).toBe(initialState);
    });
  });

  describe('logoutUser fulfilled', () => {
    test('при выполнение запроса данные сохраняются в состоянии, а isLoading становится false', () => {
      const action = {
        type: logoutUser.fulfilled.type
      };
      const nextState = userReducer(initialState, action);

      expect(nextState).toBe(initialState);
    });
  });

  describe('logoutUser rejected', () => {
    test('при ошибке в запросе isLoading становится false', () => {
      const action = { type: logoutUser.rejected.type };
      const nextState = userReducer(initialState, action);

      expect(nextState).toBe(initialState);
    });
  });

  describe('registerUser pending', () => {
    test('при загрузке isLoading должен быть true', () => {
      const action = { type: registerUser.pending.type };
      const nextState = userReducer(initialState, action);

      expect(nextState.isLoading).toBeTruthy();
      expect(nextState.data).toBe(initialState.data);
      expect(nextState.isAuth).toBe(initialState.isAuth);
      expect(nextState.error).toBe('');
    });
  });

  describe('registerUser fulfilled', () => {
    test('при выполнение запроса данные сохраняются в состоянии, а isLoading становится false', () => {
      const mockUser = {
        email: 'test@test.ru',
        name: 'Test'
      };

      const action = {
        type: registerUser.fulfilled.type,
        payload: { user: mockUser }
      };
      const nextState = userReducer(initialState, action);

      expect(nextState.isLoading).toBe(initialState.isLoading);
      expect(nextState.data).toBe(mockUser);
      expect(nextState.isAuth).toBeTruthy();
      expect(nextState.error).toBe(initialState.error);
    });
  });

  describe('registerUser rejected', () => {
    test('при ошибке в запросе isLoading становится false', () => {
      const errorMessage = 'Invalid credentials';

      const action = {
        type: registerUser.rejected.type,
        error: { message: errorMessage }
      };
      const nextState = userReducer(initialState, action);

      expect(nextState.isLoading).toBe(false);
      expect(nextState.data).toBe(initialState.data);
      expect(nextState.isAuth).toBe(initialState.isAuth);
      expect(nextState.error).toBe(errorMessage);
    });
  });

  describe('updateUser pending', () => {
    test('при загрузке isLoading должен быть true', () => {
      const action = { type: updateUser.pending.type };
      const nextState = userReducer(initialState, action);

      expect(nextState.isLoading).toBeTruthy();
      expect(nextState.data).toBe(initialState.data);
      expect(nextState.isAuth).toBe(initialState.isAuth);
      expect(nextState.error).toBe('');
    });
  });

  describe('updatehUser fulfilled', () => {
    test('при выполнение запроса данные сохраняются в состоянии, а isLoading становится false', () => {
      const mockUser = {
        email: 'test2@test.ru',
        name: 'Test2'
      };

      const action = {
        type: updateUser.fulfilled.type,
        payload: { user: mockUser }
      };
      const nextState = userReducer(initialState, action);

      expect(nextState.isLoading).toBe(initialState.isLoading);
      expect(nextState.data).toBe(mockUser);
      expect(nextState.isAuth).toBeTruthy();
      expect(nextState.error).toBe(initialState.error);
    });
  });

  describe('updateUser rejected', () => {
    test('при ошибке в запросе isLoading становится false', () => {
      const errorMessage = 'Invalid credentials';

      const action = {
        type: updateUser.rejected.type,
        error: { message: errorMessage }
      };
      const nextState = userReducer(initialState, action);

      expect(nextState.isLoading).toBe(false);
      expect(nextState.data).toBe(initialState.data);
      expect(nextState.isAuth).toBe(initialState.isAuth);
      expect(nextState.error).toBe(errorMessage);
    });
  });
});
