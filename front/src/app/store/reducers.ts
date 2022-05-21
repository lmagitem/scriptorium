import { ActionReducerMap } from '@ngrx/store';
import { AppActionTypes } from './app';
import { appReducer, AppState } from './app/app.reducers';

export interface State {
  app: AppState;
  /*  pixi: {
    width: number;
    height: number;
  };*/
}

export let stateReducers: ActionReducerMap<State> = {
  app: appReducer,
  // pixiReducer,
};

export let appActions = [AppActionTypes];
