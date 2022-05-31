import { getPixiSize } from './pixi.selectors';
import * as PixiStore from './index';

describe('PixiStore', () => {
  const pixiState = PixiStore.pixiReducer;
  const createState = (props = {}) => {
    const defaultState: PixiStore.PixiState = {
      width: -1,
      height: -1,
    };
    return { ...defaultState, ...props };
  };

  describe('Reducer', () => {
    let state: PixiStore.PixiState;

    beforeEach(() => {
      state = createState();
    });

    it('should update pixi size when PixiSizeChange action is emitted', () => {
      expect(state.width).toBe(-1);
      expect(state.height).toBe(-1);

      const newWidth = 800;
      const newHeight = 600;
      state = pixiState(
        state,
        new PixiStore.PixiSizeChange({ width: newWidth, height: newHeight })
      );

      expect(state.width).toBe(newWidth);
      expect(state.height).toBe(newHeight);
    });
  });

  describe('getPixiSize()', () => {
    let state;

    beforeEach(() => {
      state = createState();
    });

    it('should return a properly updated value after PixiSizeChange action was emitted', () => {
      expect(JSON.stringify(getPixiSize({ pixi: state }))).toEqual(
        JSON.stringify({ width: -1, height: -1 })
      );

      const newWidth = 800;
      const newHeight = 600;
      state = pixiState(
        state,
        new PixiStore.PixiSizeChange({ width: newWidth, height: newHeight })
      );

      expect(JSON.stringify(getPixiSize({ pixi: state }))).toEqual(
        JSON.stringify({ width: newWidth, height: newHeight })
      );
    });
  });
});
