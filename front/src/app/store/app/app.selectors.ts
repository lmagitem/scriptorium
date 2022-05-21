import { createSelector } from '@ngrx/store';
import { AppState } from './app.reducers';

export const getAppState = (state) => state.app;

export const getAppSize = createSelector(getAppState, (state: AppState) => ({
  width: state?.width,
  height: state?.height,
}));
