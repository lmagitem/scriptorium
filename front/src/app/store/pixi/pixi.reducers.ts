import { PixiActionTypes, PixiActions } from './pixi.actions';
import { migrateReducerState } from '../store.utils';

export interface PixiState {
  width: number;
  height: number;
}

const newInitialState: PixiState = {
  width: -1,
  height: -1,
};

const initialState: PixiState = migrateReducerState(
  'pixi',
  newInitialState,
  localStorage
);

export function pixiReducer(
  state: PixiState = initialState,
  action: PixiActions
): PixiState {
  switch (action.type) {
    case PixiActionTypes.PIXI_SIZE_CHANGE: {
      return {
        ...state,
        width: action.payload.width,
        height: action.payload.height,
      };
    }

    default:
      return {
        ...initialState,
        ...state,
      };
  }
}
