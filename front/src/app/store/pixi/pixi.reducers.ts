import { PixiActionTypes, PixiActions } from './pixi.actions';
import { AppActionTypes, AppActions } from '../app/app.actions';
import { migrateReducerState } from '../store.utils';

export interface PixiState {
  width: number;
  height: number;
}

const newInitialState: PixiState = {
  width: 0,
  height: 0,
};

const initialState: PixiState = migrateReducerState(
  'pixi',
  newInitialState,
  localStorage
);

export function pixiReducer(
  state: PixiState = initialState,
  action: PixiActions | AppActions
): PixiState {
  switch (action.type) {
    case AppActionTypes.APP_SIZE_CHANGE: {
      return {
        ...state,
        width: action.payload.width,
        height: action.payload.height - action.payload.footerHeight,
      };
    }

    default:
      return {
        ...initialState,
        ...state,
      };
  }
}
