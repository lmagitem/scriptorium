import { AppActionTypes, AppActions } from './app.actions';
import { migrateReducerState } from '../store.utils';

export interface AppState {
  width: number;
  height: number;
  footerHeight: number;
}

const newInitialState: AppState = {
  width: 0,
  height: 0,
  footerHeight: 0,
};

const initialState: AppState = migrateReducerState(
  'appSettings',
  newInitialState,
  localStorage
);

export function appReducer(
  state: AppState = initialState,
  action: AppActions
): AppState {
  switch (action.type) {
    case AppActionTypes.APP_SIZE_CHANGE: {
      return {
        ...state,
        width: action.payload.width,
        height: action.payload.height,
        footerHeight: action.payload.footerHeight,
      };
    }

    default:
      return {
        ...initialState,
        ...state,
      };
  }
}
