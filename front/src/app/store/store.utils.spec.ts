import { migrateReducerState } from './store.utils';
let mockStoredState;
let mockLocalStorage: {
  getItem: () => any;
  removeItem: () => false;
};

describe('StoreUtils', () => {
  describe('migrateReducerState()', () => {
    beforeEach(() => {
      mockStoredState = {
        sidebarExpanded: true,
        requestInProcess: false,
      };
      mockLocalStorage = {
        getItem: () => JSON.stringify(mockStoredState),
        removeItem: () => false,
      };
    });

    it('should return a new state with previous state values', () => {
      const newState = {
        sidebarExpanded: true,
        requestInProcess: true,
        newProp: 213,
      };

      const actual = migrateReducerState('oldKey', newState, mockLocalStorage);
      expect(actual.requestInProcess).toBeFalsy();
    });

    it('should return a new state without previous state values', () => {
      const newState = {
        sidebarExpanded: true,
        requestInProcess: true,
        newProp: 213,
      };
      mockLocalStorage.getItem = () => null;

      const actual = migrateReducerState('oldKey', newState, mockLocalStorage);
      expect(actual.requestInProcess).toBeTruthy();
    });
  });
});
