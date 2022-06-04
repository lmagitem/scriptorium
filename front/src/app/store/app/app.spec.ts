import { getAppSize } from './app.selectors';
import * as AppStore from './index';

describe('AppStore', () => {
  const appSettings = AppStore.appReducer;
  const createState = (props = {}) => {
    const defaultState: AppStore.AppState = {
      width: 0,
      height: 0,
      footerHeight: 0,
    };
    return { ...defaultState, ...props };
  };

  describe('appReducer()', () => {
    let state: AppStore.AppState;

    beforeEach(() => {
      state = createState();
    });

    it('should update app size when AppSizeChange action is emitted', () => {
      // Given
      expect(state.width).toBe(0);
      expect(state.height).toBe(0);
      expect(state.footerHeight).toBe(0);
      const newWidth = 800;
      const newHeight = 600;
      const newFooterHeight = 60;

      // When
      state = appSettings(
        state,
        new AppStore.AppSizeChange({
          width: newWidth,
          height: newHeight,
          footerHeight: newFooterHeight,
        })
      );

      // Then
      expect(state.width).toBe(newWidth);
      expect(state.height).toBe(newHeight);
      expect(state.footerHeight).toBe(newFooterHeight);
    });
  });

  describe('getAppSize()', () => {
    let state;

    beforeEach(() => {
      state = createState();
    });

    it('should return a properly updated value after AppSizeChange action was emitted', () => {
      // Given
      expect(JSON.stringify(getAppSize({ app: state }))).toEqual(
        JSON.stringify({ width: 0, height: 0, footerHeight: 0 })
      );
      const newWidth = 800;
      const newHeight = 600;
      const newFooterHeight = 60;

      // When
      state = appSettings(
        state,
        new AppStore.AppSizeChange({
          width: newWidth,
          height: newHeight,
          footerHeight: newFooterHeight,
        })
      );

      // Then
      expect(JSON.stringify(getAppSize({ app: state }))).toEqual(
        JSON.stringify({
          width: newWidth,
          height: newHeight,
          footerHeight: newFooterHeight,
        })
      );
    });
  });
});
