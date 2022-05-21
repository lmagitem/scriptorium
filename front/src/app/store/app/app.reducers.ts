import { AppActionTypes, AppActions } from './app.actions';
import { migrateReducerState } from '../store.utils';

export interface AppState {
  width: number;
  height: number;
}

const newInitialState: AppState = {
  width: -1,
  height: -1,
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
      };
    }

    default:
      return {
        ...initialState,
        ...state,
      };
  }
}
