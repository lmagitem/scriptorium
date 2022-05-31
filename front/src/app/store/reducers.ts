import { ActionReducerMap } from '@ngrx/store';
import { AppActionTypes } from './app';
import { appReducer, AppState } from './app/app.reducers';
import { pixiReducer, PixiState } from './pixi';

export interface State {
  app: AppState;
  pixi: PixiState;
}

export let stateReducers: ActionReducerMap<State> = {
  app: appReducer,
  pixi: pixiReducer,
};

export let appActions = [AppActionTypes];
