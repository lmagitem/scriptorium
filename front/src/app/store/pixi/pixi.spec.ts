import { getPixiSize } from './pixi.selectors';
import * as PixiStore from './index';
import * as AppStore from '../app/index';

describe('PixiStore', () => {
  const pixiState = PixiStore.pixiReducer;
  const createState = (props = {}) => {
    const defaultState: PixiStore.PixiState = {
      width: 0,
      height: 0,
    };
    return { ...defaultState, ...props };
  };

  describe('pixiReducer()', () => {
    let state: PixiStore.PixiState;

    beforeEach(() => {
      state = createState();
    });

    it('should update pixi size when AppSizeChange action is emitted', () => {
      // Given
      expect(state.width).toBe(0);
      expect(state.height).toBe(0);
      const newWidth = 800;
      const newHeight = 600;
      const newFooterHeight = 60;

      // When
      state = pixiState(
        state,
        new AppStore.AppSizeChange({
          width: newWidth,
          height: newHeight,
          footerHeight: newFooterHeight,
        })
      );

      // Then
      expect(state.width).toBe(newWidth);
      expect(state.height).toBe(newHeight - newFooterHeight);
    });
  });

  describe('getPixiSize()', () => {
    let state;

    beforeEach(() => {
      state = createState();
    });

    it('should return a properly updated value after AppSizeChange action was emitted', () => {
      // Given
      expect(JSON.stringify(getPixiSize({ pixi: state }))).toEqual(
        JSON.stringify({ width: 0, height: 0 })
      );
      const newWidth = 800;
      const newHeight = 600;
      const newFooterHeight = 60;

      // When
      state = pixiState(
        state,
        new AppStore.AppSizeChange({
          width: newWidth,
          height: newHeight,
          footerHeight: newFooterHeight,
        })
      );

      // Then
      expect(JSON.stringify(getPixiSize({ pixi: state }))).toEqual(
        JSON.stringify({ width: newWidth, height: newHeight - newFooterHeight })
      );
    });
  });
});
