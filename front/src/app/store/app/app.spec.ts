import { getAppSize } from './app.selectors';
import * as AppStore from './index';

describe('AppStore', () => {
  const appSettings = AppStore.appReducer;
  const createState = (props = {}) => {
    const defaultState: AppStore.AppState = {
      width: -1,
      height: -1,
    };
    return { ...defaultState, ...props };
  };

  describe('Reducer', () => {
    let state: AppStore.AppState;

    beforeEach(() => {
      state = createState();
    });

    it('should update app size when AppSizeChange action is emitted', () => {
      expect(state.width).toBe(-1);
      expect(state.height).toBe(-1);

      const newWidth = 800;
      const newHeight = 600;
      state = appSettings(
        state,
        new AppStore.AppSizeChange({ width: newWidth, height: newHeight })
      );

      expect(state.width).toBe(newWidth);
      expect(state.height).toBe(newHeight);
    });
  });

  describe('getAppSize()', () => {
    let state;

    beforeEach(() => {
      state = createState();
    });

    it('should return a properly updated value after AppSizeChange action was emitted', () => {
      expect(JSON.stringify(getAppSize({ app: state }))).toEqual(
        JSON.stringify({ width: -1, height: -1 })
      );

      const newWidth = 800;
      const newHeight = 600;
      state = appSettings(
        state,
        new AppStore.AppSizeChange({ width: newWidth, height: newHeight })
      );

      expect(JSON.stringify(getAppSize({ app: state }))).toEqual(
        JSON.stringify({ width: newWidth, height: newHeight })
      );
    });
  });
});
