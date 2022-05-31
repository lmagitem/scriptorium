import { createSelector } from '@ngrx/store';
import { PixiState } from './pixi.reducers';

export const getPixiState = (state) => state.pixi;

export const getPixiSize = createSelector(getPixiState, (state: PixiState) => ({
  width: state?.width,
  height: state?.height,
}));
